<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref(new Date())
const currentMonth = ref(currentDate.value.getMonth())
const currentYear = ref(currentDate.value.getFullYear())

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay()
}

function generateCalendarDays() {
    const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value)
    const firstDay = getFirstDayOfMonth(currentMonth.value, currentYear.value)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    return days
}

const calendarDays = ref(generateCalendarDays())

function previousMonth() {
    if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
    } else {
        currentMonth.value--
    }
    calendarDays.value = generateCalendarDays()
}

function nextMonth() {
    if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
    } else {
        currentMonth.value++
    }
    calendarDays.value = generateCalendarDays()
}

const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear()
}
</script>

<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-4">
            <button @click="previousMonth" class="p-1 hover:bg-accent rounded-sm">
                <span class="sr-only">Previous month</span>
                ←
            </button>
            <h2 class="font-semibold">
                {{ months[currentMonth] }} {{ currentYear }}
            </h2>
            <button @click="nextMonth" class="p-1 hover:bg-accent rounded-sm">
                <span class="sr-only">Next month</span>
                →
            </button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center text-sm">
            <div v-for="day in days" :key="day" class="font-medium text-muted-foreground">
                {{ day }}
            </div>
        </div>
        <div class="grid grid-cols-7 gap-1 mt-1">
            <button v-for="(day, index) in calendarDays" :key="index" :class="[
                'h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-sm',
                isToday(day) ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : '',
                !day ? 'text-muted-foreground opacity-50' : ''
            ]" :disabled="!day">
                {{ day }}
            </button>
        </div>
    </div>
</template>