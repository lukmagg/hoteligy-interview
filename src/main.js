import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'flowbite'

// import './assets/tailwind.css'
import './index.css'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueTailwindDatepicker)
app.use(Vue3Toastify, {
  autoClose: 3000,
  style: {
    opacity: '1',
    userSelect: 'initial',
  },
})
app.use(router)

app.mount('#app')
