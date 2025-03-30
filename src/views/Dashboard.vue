<template>
    <div class="w-full">
        <div class="mb-8">
            <p class="text-muted-foreground">Welcome to your healthcare dashboard.</p>
        </div>
        <DashboardCards />
    </div>
</template>

<script setup lang="ts">
import DashboardCards from '@/components/dashboard/DashboardCards.vue'
</script>