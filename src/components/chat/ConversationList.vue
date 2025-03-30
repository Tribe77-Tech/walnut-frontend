<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Conversation } from '@/mock/conversations'
import type { Patient } from '@/types/patient'
import ConversationListItem from './ConversationListItem.vue'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

const props = defineProps<{
    conversations: Conversation[]
    patients: Patient[]
    selectedConversationId?: string
}>()

const emit = defineEmits<{
    selectConversation: [conversation: Conversation]
}>()

const searchQuery = ref('')

const filteredConversations = computed(() => {
    if (!searchQuery.value) return props.conversations

    const query = searchQuery.value.toLowerCase()
    return props.conversations.filter(conversation => {
        const patient = props.patients.find(p => p.id === conversation.patientId)
        if (!patient) return false

        return patient.name.toLowerCase().includes(query)
    })
})

const getPatientForConversation = (conversation: Conversation): Patient | undefined => {
    return props.patients.find(p => p.id === conversation.patientId)
}
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="relative mb-4">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input v-model="searchQuery" type="text" placeholder="Search conversations..." class="pl-9" />
        </div>

        <div class="overflow-auto flex-grow">
            <div v-if="filteredConversations.length" class="space-y-1">
                <ConversationListItem v-for="conversation in filteredConversations" :key="conversation.id"
                    :conversation="conversation"
                    :patient="getPatientForConversation(conversation) || { id: '', name: 'Unknown', condition: '', status: { type: 'chronic', label: '' } }"
                    :is-selected="conversation.id === selectedConversationId"
                    @select="emit('selectConversation', $event)" />
            </div>
            <div v-else class="flex items-center justify-center h-full">
                <p class="text-muted-foreground text-center">No conversations found</p>
            </div>
        </div>
    </div>
</template>