<script setup lang="ts">
import { type Patient } from '@/types/patient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
    patient: Patient
}>()

const emit = defineEmits<{
    back: []
}>()

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
}
</script>

<template>
    <div class="flex items-center gap-3 mb-4 md:hidden">
        <Button variant="ghost" size="icon" @click="emit('back')">
            <ArrowLeft class="h-5 w-5" />
        </Button>
        <Avatar class="h-10 w-10">
            <AvatarImage v-if="patient.image" :src="patient.image" :alt="patient.name" />
            <AvatarFallback>{{ getInitials(patient.name) }}</AvatarFallback>
        </Avatar>
        <div>
            <h2 class="font-medium text-base">{{ patient.name }}</h2>
            <p class="text-muted-foreground text-xs">{{ patient.condition }}</p>
        </div>
    </div>
</template>