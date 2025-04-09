<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    router.push('/')
    toast({
      title: 'Success',
      description: 'Welcome back!',
    })
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Invalid credentials. Please try again.',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form :class="cn('flex flex-col gap-6')" @submit="handleSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">
        Welcome to Walnut Health
      </h1>
      <p class="text-balance text-sm text-muted-foreground">
        Sign in to your healthcare provider account
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" type="text" placeholder="admin" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="password">Password</Label>
          <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" v-model="password" type="password" required />
      </div>
      <Button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </Button>
      <div
        class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span class="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button variant="outline" class="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 mr-2">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor" />
        </svg>
        Sign in with Google
      </Button>
    </div>
    <div class="text-center text-sm">
      New to Walnut Health?
      <a href="#" class="underline underline-offset-4 text-primary">
        Request access
      </a>
    </div>
  </form>
</template>
