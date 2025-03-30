<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Patient } from '@/types/patient'
import PatientListItem from './PatientListItem.vue'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

const props = defineProps<{
    patients: Patient[]
    selectedPatientId?: string
}>()

const emit = defineEmits<{
    selectPatient: [patient: Patient]
}>()

const searchQuery = ref('')

const filteredPatients = computed(() => {
    if (!searchQuery.value) return props.patients

    const query = searchQuery.value.toLowerCase()
    return props.patients.filter(patient =>
        patient.name.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query)
    )
})
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="relative mb-4">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input v-model="searchQuery" type="text" placeholder="Search patients..." class="pl-9" />
        </div>

        <div class="overflow-auto flex-grow">
            <div v-if="filteredPatients.length" class="space-y-1">
                <PatientListItem v-for="patient in filteredPatients" :key="patient.id" :patient="patient"
                    :is-selected="patient.id === selectedPatientId" @select="emit('selectPatient', $event)" />
            </div>
            <div v-else class="flex items-center justify-center h-full">
                <p class="text-muted-foreground text-center">No patients found</p>
            </div>
        </div>
    </div>
</template>