import schoolModel from '../../school-model.mjs';
export default (request, context) => schoolModel(request, {
  SCHOOL_MODEL_KEY: Netlify.env.get('SCHOOL_MODEL_KEY'),
  ALLOW_BROWSER_SHARED_KEY: Netlify.env.get('ALLOW_BROWSER_SHARED_KEY')
}, context.ip || 'unknown');
