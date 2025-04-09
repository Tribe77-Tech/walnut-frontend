import { createRouter, createWebHistory } from 'vue-router'

// Define routes
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresAuth: false } // Public route
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true } // Protected route
    },
    {
        path: '/patients',
        name: 'Patients',
        component: () => import('@/views/Patients.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/Chats.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/team',
        name: 'Team',
        component: () => import('@/views/Team.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: { requiresAuth: true }
    },
    // Catch-all route (optional, good practice)
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
    // Check authentication status (using localStorage for this example)
    const isAuthenticated = localStorage.getItem('user') !== null;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        // Redirect unauthenticated users trying to access protected routes to login
        console.log('Redirecting to /login (requires auth, not authenticated)');
        next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
        // Redirect authenticated users trying to access login page to dashboard
        console.log('Redirecting to / (already authenticated)');
        next({ name: 'Dashboard' });
    } else {
        // Allow navigation
        next();
    }
});

export default router; 