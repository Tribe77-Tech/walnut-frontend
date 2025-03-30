<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue'
import { useHead } from '@vueuse/head'

useHead({
    title: 'Chats | Walnut Health'
})
</script>

<template>
    <main class="container h-full px-0 md:px-4 py-0 md:py-4">
        <div class="h-full overflow-hidden bg-card border rounded-none md:rounded-lg">
            <Chat />
        </div>
    </main>
</template>