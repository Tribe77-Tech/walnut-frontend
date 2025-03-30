<script setup lang="ts">
import type { Conversation } from '@/mock/conversations'
import type { Patient } from '@/types/patient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const props = defineProps<{
    conversation: Conversation
    patient: Patient
    isSelected: boolean
}>()

defineEmits<{
    select: [conversation: Conversation]
}>()

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
}

const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
        // Today - show time
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    } else if (diffInDays === 1) {
        // Yesterday
        return 'Yesterday'
    } else if (diffInDays < 7) {
        // Within a week - show day name
        return date.toLocaleDateString(undefined, { weekday: 'short' })
    } else {
        // Older - show date
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        })
    }
}

const lastMessage = props.conversation.messages[props.conversation.messages.length - 1]
const truncateMessage = (content: string, maxLength = 40) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
}
</script>

<template>
    <div class="flex items-center p-3 mb-2 rounded-md cursor-pointer transition-colors" :class="cn(
        'hover:bg-accent/50',
        isSelected ? 'bg-accent/50 border-l-4 border-l-primary' : 'bg-card'
    )" @click="$emit('select', conversation)">
        <div class="relative">
            <Avatar class="h-10 w-10 mr-3">
                <AvatarImage v-if="patient.image" :src="patient.image" :alt="patient.name" />
                <AvatarFallback>{{ getInitials(patient.name) }}</AvatarFallback>
            </Avatar>
            <Badge v-if="conversation.unreadCount > 0"
                class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                {{ conversation.unreadCount }}
            </Badge>
        </div>

        <div class="flex-grow min-w-0">
            <div class="flex items-start justify-between gap-2">
                <h4 class="font-medium text-sm truncate" :class="{ 'font-bold': conversation.unreadCount > 0 }">
                    {{ patient.name }}
                </h4>
                <span class="text-xs text-muted-foreground shrink-0">
                    {{ formatLastMessageTime(conversation.lastMessageAt) }}
                </span>
            </div>
            <p class="text-muted-foreground text-xs truncate"
                :class="{ 'text-foreground font-medium': conversation.unreadCount > 0 }">
                {{ lastMessage.isSentByMe ? 'You: ' : '' }}{{ truncateMessage(lastMessage.content) }}
            </p>
        </div>
    </div>
</template>