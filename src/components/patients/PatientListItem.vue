<script setup lang="ts">
import { type Patient } from '@/types/patient'
import PatientStatusBadge from './PatientStatusBadge.vue'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps<{
    patient: Patient
    isSelected: boolean
}>()

defineEmits<{
    select: [patient: Patient]
}>()

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
}
</script>

<template>
    <div class="flex items-center p-3 mb-2 rounded-md cursor-pointer transition-colors" :class="cn(
        'hover:bg-accent/50',
        isSelected ? 'bg-accent/50 border-l-4 border-l-primary' : 'bg-card'
    )" @click="$emit('select', patient)">
        <Avatar class="h-10 w-10 mr-3">
            <AvatarImage v-if="patient.image" :src="patient.image" :alt="patient.name" />
            <AvatarFallback>{{ getInitials(patient.name) }}</AvatarFallback>
        </Avatar>

        <div class="flex-grow min-w-0">
            <div class="flex items-start justify-between gap-2">
                <h4 class="font-medium text-sm truncate">{{ patient.name }}</h4>
                <PatientStatusBadge :type="patient.status.type" :label="patient.status.label" class="shrink-0" />
            </div>
            <p class="text-muted-foreground text-xs truncate">{{ patient.condition }}</p>
        </div>
    </div>
</template>