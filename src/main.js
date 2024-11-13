import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'flowbite'

import './assets/tailwind.css'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const app = createApp(App)

app.use(createPinia())
app.use(VueTailwindDatepicker)

app.use(router)

app.mount('#app')
