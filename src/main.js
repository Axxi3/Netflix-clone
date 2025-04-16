import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'
import router from './router'
const app=createApp(App)
app.use(router)
app.use(createVfm())
app.mount('#app')





