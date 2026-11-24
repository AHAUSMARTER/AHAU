import schoolModel from '../../school-model.mjs';
export default (request, context) => schoolModel(request, {
  SCHOOL_MODEL_KEY: Netlify.env.get('SCHOOL_MODEL_KEY')
}, context.ip || 'unknown');
