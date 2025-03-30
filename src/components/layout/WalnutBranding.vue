<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'
import { computed } from 'vue'

const { state } = useSidebar()
const isCollapsed = computed(() => state.value === 'collapsed')
</script>

<template>
    <div class="flex h-14 items-center justify-center border-b" :class="[isCollapsed ? 'px-2' : 'px-6']">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/20">
            <span class="font-bold text-primary text-lg">W</span>
        </div>
        <div class="flex flex-col overflow-hidden ml-2" v-show="!isCollapsed">
            <span class="font-semibold text-base leading-none">Walnut</span>
            <span class="text-xs text-muted-foreground">Healthcare</span>
        </div>
    </div>
</template>