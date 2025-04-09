import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
    id: string
    name: string
    email: string
    role: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthenticated = ref(false)

    // Initialize auth state from localStorage
    const initAuth = () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
            isAuthenticated.value = true
        }
    }

    // Login function
    const login = async (email: string, password: string) => {
        // For demo purposes, we'll use a simple check
        if (email === 'admin' && password === 'admin') {
            const mockUser = {
                id: '1',
                name: 'Admin User',
                email: 'admin@walnuthealth.com',
                role: 'admin'
            }
            user.value = mockUser
            isAuthenticated.value = true
            localStorage.setItem('user', JSON.stringify(mockUser))
            return true
        }
        throw new Error('Invalid credentials')
    }

    // Logout function
    const logout = () => {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('user')
    }

    return {
        user,
        isAuthenticated,
        login,
        logout,
        initAuth
    }
}) 