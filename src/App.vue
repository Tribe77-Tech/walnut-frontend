<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>

<template>
  <AuthLayout v-if="route.meta.requiresAuth">
    <RouterView />
  </AuthLayout>
  <RouterView v-else />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  @apply bg-background;
}

:root {
  --sidebar-width: 240px;
  --sidebar-width-icon: 64px;
}

.sidebar-toggle-btn {
  @apply h-7 w-7 flex items-center justify-center bg-card text-muted-foreground rounded-full shadow-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors;
}

.sidebar-toggle-btn-mobile {
  @apply h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors;
}
</style>
