<script setup lang="ts">
import { ref } from 'vue'
import { Users, MessageSquare, FileText, Calendar } from 'lucide-vue-next'
import DashboardCalendar from './DashboardCalendar.vue'

interface CardData {
    title: string
    value: string | number
    description?: string
    trend?: {
        value: number
        direction: 'up' | 'down'
    }
}

const cards = ref<CardData[]>([
    {
        title: 'Total Patients',
        value: '2,350',
        description: '+180 from last month',
        trend: {
            value: 12.5,
            direction: 'up'
        }
    },
    {
        title: 'Team Members',
        value: '24',
        description: 'Active healthcare providers'
    },
    {
        title: 'New Reports',
        value: '18',
        description: 'Generated this week',
        trend: {
            value: 8.2,
            direction: 'up'
        }
    }
])

const teamMembers = ref([
    {
        name: 'Dr. Sarah Johnson',
        role: 'Cardiologist',
        avatar: '🫀',
        status: 'online'
    },
    {
        name: 'Dr. Michael Chen',
        role: 'Pediatrician',
        avatar: '👶',
        status: 'busy'
    },
    {
        name: 'Dr. Emily Brown',
        role: 'Neurologist',
        avatar: '🧠',
        status: 'offline'
    }
])

const lastChat = ref({
    user: 'Dr. Sarah Johnson',
    message: 'Patient report has been updated',
    time: '10:45 AM'
})
</script>

<template>
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- Stats Cards -->
        <div v-for="card in cards" :key="card.title" class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium tracking-wide text-muted-foreground">{{ card.title }}</h3>
                    <span v-if="card.trend" :class="[
                        'text-xs',
                        card.trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'
                    ]">
                        {{ card.trend.direction === 'up' ? '↑' : '↓' }} {{ card.trend.value }}%
                    </span>
                </div>
                <div class="mt-2">
                    <p class="text-2xl font-bold">{{ card.value }}</p>
                    <p class="text-xs text-muted-foreground">{{ card.description }}</p>
                </div>
            </div>
        </div>

        <!-- Team Members Card -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium tracking-wide text-muted-foreground">Team Members</h3>
                    <Users class="h-4 w-4 text-muted-foreground" />
                </div>
                <div class="mt-4 space-y-3">
                    <div v-for="member in teamMembers" :key="member.name" class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            {{ member.avatar }}
                        </div>
                        <div>
                            <p class="text-sm font-medium leading-none">{{ member.name }}</p>
                            <p class="text-sm text-muted-foreground">{{ member.role }}</p>
                        </div>
                        <div :class="[
                            'ml-auto h-2 w-2 rounded-full',
                            member.status === 'online' ? 'bg-emerald-500' :
                                member.status === 'busy' ? 'bg-orange-500' : 'bg-gray-300'
                        ]" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Last Chat Card -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium tracking-wide text-muted-foreground">Recent Messages</h3>
                    <button
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                        <MessageSquare class="h-4 w-4" />
                    </button>
                </div>
                <div class="mt-4">
                    <div class="flex items-start gap-4">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            👩‍⚕️
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2">
                                <p class="text-sm font-medium leading-none">{{ lastChat.user }}</p>
                                <span class="text-xs text-muted-foreground">{{ lastChat.time }}</span>
                            </div>
                            <p class="text-sm text-muted-foreground">{{ lastChat.message }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Calendar Card -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium tracking-wide text-muted-foreground">Calendar</h3>
                    <Calendar class="h-4 w-4 text-muted-foreground" />
                </div>
                <div class="mt-4">
                    <DashboardCalendar />
                </div>
            </div>
        </div>

        <!-- New Reports Card -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium tracking-wide text-muted-foreground">New Reports</h3>
                    <FileText class="h-4 w-4 text-muted-foreground" />
                </div>
                <div class="mt-4 space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            📄
                        </div>
                        <div>
                            <p class="text-sm font-medium leading-none">Weekly Patient Summary</p>
                            <p class="text-xs text-muted-foreground">Generated 2 hours ago</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            📊
                        </div>
                        <div>
                            <p class="text-sm font-medium leading-none">Monthly Analytics</p>
                            <p class="text-xs text-muted-foreground">Generated yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>