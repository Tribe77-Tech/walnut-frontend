<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { Conversation } from '@/mock/conversations'
import type { Patient } from '@/types/patient'
import { patients } from '@/mock/patients'
import { conversations as mockConversations } from '@/mock/conversations'
import ConversationList from './ConversationList.vue'
import ChatInterface from './ChatInterface.vue'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'

// Responsive detection
const isDesktop = useMediaQuery('(min-width: 768px)')
const showMobileList = ref(true)

// Data
const conversations = ref<Conversation[]>(mockConversations)
const selectedConversationId = ref<string | undefined>(undefined)

// Get patient by ID
const getPatientById = (patientId: string): Patient | undefined => {
    return patients.find(p => p.id === patientId)
}

// Computed properties
const selectedConversation = computed(() =>
    conversations.value.find(c => c.id === selectedConversationId.value)
)

const selectedPatient = computed(() =>
    selectedConversation.value ? getPatientById(selectedConversation.value.patientId) : undefined
)

// Handle conversation selection
const handleSelectConversation = (conversation: Conversation) => {
    selectedConversationId.value = conversation.id
    if (!isDesktop.value) {
        showMobileList.value = false
    }
}

// Handle back button in mobile view
const handleBackToList = () => {
    showMobileList.value = true
}

// Handle sending a new message
const handleSendMessage = (content: string, conversationId: string) => {
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (!conversation || !selectedPatient.value) return

    // Add message to conversation
    conversation.messages.push({
        id: `msg-${Date.now()}`,
        content,
        senderId: 'doctor',
        receiverId: selectedPatient.value.id,
        timestamp: new Date().toISOString(),
        isSentByMe: true,
        isRead: false
    })

    // Update last message timestamp
    conversation.lastMessageAt = new Date().toISOString()

    // Move conversation to top of list
    const updatedConversations = conversations.value.filter(c => c.id !== conversationId)
    conversations.value = [conversation, ...updatedConversations]
}
</script>

<template>
    <div class="h-full flex flex-col md:flex-row md:space-x-4">
        <!-- Mobile header -->
        <div v-if="!isDesktop && !showMobileList && selectedPatient" class="p-4 border-b flex items-center">
            <Button variant="ghost" size="icon" class="mr-2" @click="handleBackToList">
                <ChevronLeft class="h-5 w-5" />
            </Button>
            <span class="font-medium">{{ selectedPatient.name }}</span>
        </div>

        <!-- Conversation list (always visible on desktop, conditionally on mobile) -->
        <div v-if="isDesktop || showMobileList" class="w-full md:w-2/5 h-full border-r md:max-w-md overflow-hidden">
            <ConversationList :conversations="conversations" :patients="patients"
                :selected-conversation-id="selectedConversationId" @select-conversation="handleSelectConversation" />
        </div>

        <!-- Chat interface (always visible on desktop, conditionally on mobile) -->
        <div v-if="isDesktop || !showMobileList" class="flex-1 h-full overflow-hidden">
            <ChatInterface :conversation="selectedConversation" :patient="selectedPatient"
                @send-message="handleSendMessage" />
        </div>
    </div>
</template>