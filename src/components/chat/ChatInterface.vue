<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import type { Conversation, Message } from '@/mock/conversations'
import type { Patient } from '@/types/patient'
import ChatMessage from './ChatMessage.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, User } from 'lucide-vue-next'

const props = defineProps<{
    conversation?: Conversation
    patient?: Patient
}>()

const emit = defineEmits<{
    sendMessage: [content: string, conversationId: string]
}>()

const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

onMounted(() => {
    scrollToBottom()
})

watch(() => props.conversation, () => {
    scrollToBottom()
}, { deep: true })

const handleSendMessage = () => {
    if (!newMessage.value.trim() || !props.conversation) return

    emit('sendMessage', newMessage.value.trim(), props.conversation.id)
    newMessage.value = ''
    scrollToBottom()
}
</script>

<template>
    <div class="h-full flex flex-col">
        <div v-if="conversation && patient" class="h-full flex flex-col">
            <Card class="flex-1 flex flex-col overflow-hidden">
                <CardHeader class="pb-3 border-b">
                    <CardTitle>{{ patient.name }}</CardTitle>
                    <span class="text-sm text-muted-foreground">{{ patient.condition }}</span>
                </CardHeader>

                <CardContent ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
                    <div v-if="conversation.messages.length" class="pt-2">
                        <ChatMessage v-for="message in conversation.messages" :key="message.id" :message="message"
                            :sender-avatar="message.isSentByMe ? undefined : patient.image"
                            :sender-name="message.isSentByMe ? 'You' : patient.name" />
                    </div>
                    <div v-else class="flex items-center justify-center h-full">
                        <div class="text-center">
                            <p class="text-muted-foreground mb-2">No messages yet</p>
                            <p class="text-sm text-muted-foreground">Start the conversation by sending a message</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter class="border-t p-3">
                    <form @submit.prevent="handleSendMessage" class="flex items-center w-full gap-2">
                        <Input v-model="newMessage" placeholder="Type your message..." class="flex-1" />
                        <Button type="submit" size="icon" :disabled="!newMessage.trim()">
                            <Send class="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>

        <!-- Empty state -->
        <div v-else class="h-full flex items-center justify-center">
            <div class="text-center">
                <User class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-2 text-lg font-medium">No conversation selected</h3>
                <p class="text-sm text-muted-foreground">Select a patient to start chatting</p>
            </div>
        </div>
    </div>
</template>