<template>
    <div class="w-full">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-6">
            <Button class="flex items-center">
                <Plus class="mr-2 h-4 w-4" />
                Add New Patient
            </Button>
        </div>

        <!-- Mobile View -->
        <div v-if="isMobile" class="md:hidden">
            <!-- Mobile Patient List View (hidden when details shown) -->
            <div v-show="!showMobileDetails"
                class="bg-card border rounded-lg p-4 h-[calc(100vh-12rem)] overflow-hidden">
                <PatientList :patients="patients" :selected-patient-id="selectedPatient?.id"
                    @select-patient="handleSelectPatient" />
            </div>

            <!-- Mobile Patient Details View (shown when patient selected) -->
            <div v-show="showMobileDetails" class="bg-card border rounded-lg p-4 h-[calc(100vh-12rem)] overflow-hidden">
                <PatientMobileHeader v-if="selectedPatient" :patient="selectedPatient" @back="handleBackToList" />
                <PatientDetails :patient="selectedPatient" :hide-header="true" />
            </div>
        </div>

        <!-- Desktop View -->
        <div v-else class="grid grid-cols-10 gap-6 h-[calc(100vh-12rem)] hidden md:grid">
            <!-- Patient List (40%) -->
            <div class="col-span-4 bg-card border rounded-lg p-4 h-full overflow-hidden">
                <PatientList :patients="patients" :selected-patient-id="selectedPatient?.id"
                    @select-patient="handleSelectPatient" />
            </div>

            <!-- Patient Details (60%) -->
            <div class="col-span-6 bg-card border rounded-lg p-4 h-full overflow-hidden">
                <PatientDetails :patient="selectedPatient" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { patients } from '@/mock/patients'
import { type Patient } from '@/types/patient'
import PatientList from '@/components/patients/PatientList.vue'
import PatientDetails from '@/components/patients/PatientDetails.vue'
import PatientMobileHeader from '@/components/patients/PatientMobileHeader.vue'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

const selectedPatient = ref<Patient | undefined>(undefined)
const showMobileDetails = ref(false)
const isMobile = useMediaQuery('(max-width: 768px)')

// Select the first patient by default when component mounts
onMounted(() => {
    if (patients.length > 0) {
        selectedPatient.value = patients[0]
    }
})

const handleSelectPatient = (patient: Patient) => {
    selectedPatient.value = patient
    showMobileDetails.value = true
}

const handleBackToList = () => {
    showMobileDetails.value = false
}
</script>