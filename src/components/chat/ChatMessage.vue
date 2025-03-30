<script setup lang="ts">
import type { Message } from '@/mock/conversations'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CheckCheck } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
    message: Message
    senderAvatar?: string
    senderName: string
}>()

// Use props to avoid the TS6133 error
const { message, senderAvatar, senderName } = props

const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    })
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
}
</script>

<template>
    <div class="flex mb-4" :class="message.isSentByMe ? 'justify-end' : 'justify-start'">
        <!-- Avatar for received messages -->
        <div v-if="!message.isSentByMe" class="flex-shrink-0 mr-3">
            <Avatar class="h-8 w-8">
                <AvatarImage v-if="senderAvatar" :src="senderAvatar" :alt="senderName" />
                <AvatarFallback>{{ getInitials(senderName) }}</AvatarFallback>
            </Avatar>
        </div>

        <!-- Message Content -->
        <div class="max-w-[70%] rounded-lg px-4 py-2 text-sm" :class="cn(
            message.isSentByMe
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-muted rounded-bl-none'
        )">
            <p>{{ message.content }}</p>
            <div class="flex justify-end items-center mt-1 space-x-1 opacity-70 text-xs">
                <span>{{ formatTime(message.timestamp) }}</span>
                <CheckCheck v-if="message.isSentByMe" :class="cn('h-3 w-3', message.isRead ? 'text-blue-400' : '')" />
            </div>
        </div>
    </div>
</template>