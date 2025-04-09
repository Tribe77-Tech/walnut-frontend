import { ref } from 'vue'

interface Toast {
    title: string
    description?: string
    variant?: 'default' | 'destructive'
}

const toasts = ref<Toast[]>([])

export function useToast() {
    const toast = (props: Toast) => {
        toasts.value.push(props)
        // Remove toast after 3 seconds
        setTimeout(() => {
            toasts.value.shift()
        }, 3000)
    }

    return {
        toast,
        toasts
    }
} 