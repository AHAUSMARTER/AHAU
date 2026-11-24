import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../diagnosis_ocr.js',import.meta.url),'utf8');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup(createWorker, recognizeImage) {
  const nodes=new Map(),timers=new Map(),callbacks=[];let counter=0;
  const node=id=>{
    if(!nodes.has(id)) nodes.set(id,{hidden:false,value:'',textContent:'',style:{},addEventListener(type,callback){this[type]=callback;},removeAttribute(name){delete this[name];},focus(){}});
    return nodes.get(id);
  };
  const window={Tesseract:{createWorker},CampusModel:{recognizeImage},handleInputChange(){},addEventListener(_,cb){callbacks.push(cb);}};
  const document={currentScript:{src:'https://ahausmarter.github.io/AHAU/diagnosis_ocr.js'},getElementById:node,createElement(tag){
    if(tag==='canvas')return{toDataURL(){return 'data:image/png;base64,iVBORw0KGgo=';},getContext(){return{fillRect(){},drawImage(){}};}};
    return node(tag);
  }};
  vm.runInNewContext(source,{window,document,AbortController,location:{hostname:'ahausmarter.github.io'},URL,Date,
    createImageBitmap:async()=>({width:800,height:400,close(){}}),
    setTimeout(callback,delay){const id=++counter;timers.set(id,{callback,delay});return id;},clearTimeout(id){timers.delete(id);},
    setInterval(callback,delay){const id=++counter;timers.set(id,{callback,delay,interval:true});return id;},clearInterval(id){timers.delete(id);}});
  callbacks.forEach(cb=>cb());
  const file=new Blob(['picture'],{type:'image/png'});file.name='question.png';
  return {api:window.DiagnosisOCR,node,timers,file};
}
const worker=()=>({recognitions:0,terminations:0,async recognize(){this.recognitions++;return{data:{text:'题目 2+3'}};},async terminate(){this.terminations++;}});
test('cold start uses phone-reachable assets and reports language/initialization stages',async()=>{
  const instance=worker();let options;const harness=setup(async(_,mode,o)=>{options=o;
    o.logger({status:'loading language traineddata',progress:.5});
    assert.match(harness.node('ocrStatus').textContent,/中英文识别包.*50%/);
    o.logger({status:'initializing api',progress:0});assert.match(harness.node('ocrStatus').textContent,/识别包已就绪/);return instance;});
  await harness.api.select(harness.file);
  assert.match(options.langPath,/ahau-hfnk\.netlify\.app\/ocr\/v1\/lang/);
  assert.equal(options.cachePath,'anau-ocr-v1');assert.equal(options.cacheMethod,'write');assert.equal(instance.recognitions,1);
  assert.match(harness.node('ocrStatus').textContent,/文字草稿/);assert.equal(harness.node('ocrReview').hidden,false);
});
test('explicit retry bypasses old language cache and refreshes it',async()=>{
  const methods=[];const harness=setup(async(_,mode,options)=>{methods.push(options.cacheMethod);return worker();});
  await harness.api.select(harness.file);harness.node('ocrRetry').click();await flush();
  assert.deepEqual(methods,['write','refresh']);
});
test('primary initialization failure selects fallback rather than blaming the image',async()=>{
  const paths=[];const harness=setup(async(_,mode,options)=>{paths.push(options.langPath);if(paths.length===1)throw new Error('network failed');return worker();});
  await harness.api.select(harness.file);assert.equal(paths.length,2);
  assert.ok(paths[1].startsWith('https://ahausmarter.github.io/'));assert.match(harness.node('ocrStatus').textContent,/文字草稿/);
});
test('cancelled initialization terminates a late worker without recognizing the removed image',async()=>{
  let complete;const instance=worker();const harness=setup(()=>new Promise(resolve=>{complete=resolve;}));
  const pending=harness.api.select(harness.file);await flush();harness.api.reset();complete(instance);await pending;await flush();
  assert.equal(instance.recognitions,0);assert.equal(instance.terminations,1);assert.equal(harness.node('ocrPanel').hidden,true);
});
test('initialization timeout switches source and discards an eventual worker from old attempt',async()=>{
  let complete;let count=0;const late=worker(),fresh=worker();const harness=setup(()=>++count===1?new Promise(resolve=>{complete=resolve;}):Promise.resolve(fresh));
  const pending=harness.api.select(harness.file);await flush();
  [...harness.timers.values()].find(t=>t.delay===180000).callback();await flush();complete(late);await pending;await flush();
  assert.equal(late.recognitions,0);assert.equal(late.terminations,1);assert.equal(fresh.recognitions,1);
});
test('image timeout is distinct from resource download timeout',async()=>{
  const instance=worker();instance.recognize=()=>new Promise(()=>{});const harness=setup(async()=>instance);
  const pending=harness.api.select(harness.file);await flush();
  [...harness.timers.values()].find(t=>t.delay===90000).callback();await pending;
  assert.match(harness.node('ocrStatus').textContent,/图片识别超时.*识别包已加载/);assert.equal(instance.terminations,1);
});

test('school image transcription replaces an incorrect local draft only after explicit click',async()=>{
  const instance=worker();instance.recognize=async()=>({data:{text:'函数 /xz =1-e 错误草稿'}});
  let requests=0;const harness=setup(async()=>instance,async(image,{signal})=>{
    requests++;assert.equal(image,'data:image/png;base64,iVBORw0KGgo=');assert.equal(signal.aborted,false);return '学校返回的新题：求8乘9。';
  });
  await harness.api.select(harness.file);assert.equal(requests,0);
  assert.match(harness.node('ocrStatus').textContent,/数学指数、上下标和图形可能丢失/);
  await harness.node('ocrVision').click();assert.equal(requests,1);
  assert.equal(harness.node('ocrText').value,'学校返回的新题：求8乘9。');
  assert.equal(harness.node('promptInput').value,'');harness.node('ocrApply').click();
  assert.equal(harness.node('promptInput').value,'学校返回的新题：求8乘9。');
});
test('uncertain image transcription cannot be applied as a confirmed question',async()=>{
  const harness=setup(async()=>worker(),async()=> '函数指数为[无法辨认]');
  await harness.api.select(harness.file);await harness.node('ocrVision').click();
  assert.equal(harness.node('ocrApply').disabled,true);assert.match(harness.node('ocrStatus').textContent,/无法辨认/);
});
