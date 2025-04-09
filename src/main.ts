import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router' // Import the router instance from the new file
import './style.css'

// Create Pinia store
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)

app.use(router) // Use the imported router
app.use(pinia)

app.mount('#app')
