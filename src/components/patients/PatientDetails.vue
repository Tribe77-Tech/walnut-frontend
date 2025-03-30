<script setup lang="ts">
import { type Patient } from '@/types/patient'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, User2, Activity, ClipboardList } from 'lucide-vue-next'

const props = defineProps<{
    patient?: Patient
    hideHeader?: boolean
}>()

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
}

const formatDate = (dateString?: string) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date)
}
</script>

<template>
    <div class="h-full">
        <div v-if="patient" class="h-full flex flex-col">
            <!-- Patient Header - Hidden on mobile when using PatientMobileHeader -->
            <Card v-if="!hideHeader" class="mb-4">
                <CardHeader class="pb-2">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <Avatar class="h-16 w-16 mr-4">
                                <AvatarImage v-if="patient.image" :src="patient.image" :alt="patient.name" />
                                <AvatarFallback>{{ getInitials(patient.name) }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle class="text-xl font-medium">{{ patient.name }}</CardTitle>
                                <div class="flex items-center mt-1 text-sm text-muted-foreground">
                                    <span v-if="patient.details?.age">{{ patient.details.age }} years old</span>
                                    <span v-if="patient.details?.gender" class="ml-2">{{ patient.details.gender
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <!-- Patient Information -->
            <Tabs default-value="treatment" class="flex-grow flex flex-col">
                <TabsList class="grid grid-cols-4">
                    <TabsTrigger value="treatment" class="flex items-center">
                        <Activity class="h-4 w-4 mr-2" />
                        Treatment
                    </TabsTrigger>
                    <TabsTrigger value="diagnosis" class="flex items-center">
                        <ClipboardList class="h-4 w-4 mr-2" />
                        Diagnosis
                    </TabsTrigger>
                    <TabsTrigger value="next-visit" class="flex items-center">
                        <CalendarDays class="h-4 w-4 mr-2" />
                        Next Visit
                    </TabsTrigger>
                    <TabsTrigger value="profile" class="flex items-center">
                        <User2 class="h-4 w-4 mr-2" />
                        Profile
                    </TabsTrigger>
                </TabsList>

                <!-- Treatment Section -->
                <TabsContent value="treatment" class="flex-grow overflow-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Treatment Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div v-if="patient.treatment?.medications?.length">
                                <div class="space-y-4">
                                    <div v-for="(medication, index) in patient.treatment.medications" :key="index"
                                        class="p-3 bg-accent/50 rounded-md">
                                        <div class="flex justify-between items-center">
                                            <h4 class="font-medium">{{ medication.name }}</h4>
                                            <span class="text-sm px-2 py-1 bg-primary/10 rounded">{{ medication.dosage
                                            }}</span>
                                        </div>
                                        <p v-if="medication.frequency" class="text-sm text-muted-foreground mt-1">
                                            {{ medication.frequency }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-muted-foreground">
                                No treatment information available
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Diagnosis Section -->
                <TabsContent value="diagnosis" class="flex-grow overflow-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Medical Diagnosis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div v-if="patient.diagnosis">
                                <p class="mb-4">{{ patient.diagnosis.description }}</p>

                                <h4 class="text-sm font-medium mb-2">Conditions:</h4>
                                <ul class="list-disc pl-5 mb-4">
                                    <li v-for="(condition, index) in patient.diagnosis.conditions" :key="index"
                                        class="mb-1">
                                        {{ condition }}
                                    </li>
                                </ul>

                                <div v-if="patient.diagnosis.classification" class="mt-4">
                                    <Separator class="my-3" />
                                    <div class="flex justify-between items-center">
                                        <h4 class="font-medium">Classification</h4>
                                        <span class="text-sm px-2 py-1 bg-primary/10 rounded">
                                            {{ patient.diagnosis.classification }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-muted-foreground">
                                No diagnosis information available
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Next Visit Section -->
                <TabsContent value="next-visit" class="flex-grow overflow-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Scheduled Visit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div v-if="patient.nextVisit">
                                <div class="flex items-center mb-4">
                                    <CalendarDays class="h-5 w-5 mr-2 text-primary" />
                                    <h3 class="text-lg font-medium">{{ formatDate(patient.nextVisit.date) }}</h3>
                                </div>

                                <div v-if="patient.nextVisit.tests?.length">
                                    <h4 class="text-sm font-medium mb-2">Scheduled Tests & Procedures:</h4>
                                    <ul class="space-y-2">
                                        <li v-for="(test, index) in patient.nextVisit.tests" :key="index"
                                            class="flex items-center p-2 bg-accent/30 rounded-md">
                                            <span class="h-2 w-2 rounded-full bg-primary mr-2"></span>
                                            {{ test }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else class="text-muted-foreground">
                                No upcoming visit scheduled
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <!-- Profile Section -->
                <TabsContent value="profile" class="flex-grow overflow-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm text-muted-foreground">Full Name</p>
                                        <p class="font-medium">{{ patient.name }}</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm text-muted-foreground">Condition</p>
                                        <p class="font-medium">{{ patient.condition }}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1">
                                        <p class="text-sm text-muted-foreground">Age</p>
                                        <p class="font-medium">{{ patient.details?.age || 'Not available' }}</p>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm text-muted-foreground">Gender</p>
                                        <p class="font-medium">{{ patient.details?.gender || 'Not available' }}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div class="space-y-1">
                                    <p class="text-sm text-muted-foreground">Date of Birth</p>
                                    <p class="font-medium">
                                        {{ formatDate(patient.details?.dateOfBirth) || 'Not available' }}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

        <!-- Empty State -->
        <div v-else class="h-full flex items-center justify-center">
            <div class="text-center">
                <User2 class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-2 text-lg font-medium">No patient selected</h3>
                <p class="text-sm text-muted-foreground">Select a patient from the list to view details</p>
            </div>
        </div>
    </div>
</template>