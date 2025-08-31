const RenderIf = (condition, template, fallback = '') => {
  return condition ? template : fallback;
};

export default RenderIf;
