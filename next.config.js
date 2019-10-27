const env = { ...process.env }
try { Object.assign(env, require('./env'), process.env) }
catch(e){}

module.exports = {
  env: {
    API_BACK: env.API_BACK,
    URL_FRONT: env.URL_FRONT,
    API_DETECCION: env.API_DETECCION,
  },
}
