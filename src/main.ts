import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/Dashboard.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/patients',
            component: () => import('./views/Patients.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/chat',
            component: () => import('./views/Chats.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/team',
            component: () => import('./views/Team.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/settings',
            component: () => import('./views/Settings.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

// Create Pinia store
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
