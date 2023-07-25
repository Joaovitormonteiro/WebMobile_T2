import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPlugin from 'pinia-plugin-persistedstate'

//https://pokeapi.co/api/v2/
//  const api = axios.create({ baseURL: 'https://api.thecatapi.com/v1/images/'})
// const api = axios.create({ baseURL: 'https://pokeapi.glitch.me/v1/pokemon/', headers: {
//   "Access-Control-Allow-Origin": "http://localhost:8080",
//   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
// }})

const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2/', headers: {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
}})

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  const pinia = createPinia()
  pinia.use(piniaPlugin)
})

export { api }