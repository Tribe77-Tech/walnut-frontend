<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const props = defineProps<{
    type: 'chronic' | 'acute' | 'remission'
    label: string
}>()

const badgeClass = computed(() => {
    switch (props.type) {
        case 'chronic':
            return 'bg-yellow-200 text-yellow-900 hover:bg-yellow-200'
        case 'acute':
            return 'bg-blue-200 text-blue-900 hover:bg-blue-200'
        case 'remission':
            return 'bg-green-200 text-green-900 hover:bg-green-200'
        default:
            return ''
    }
})
</script>

<template>
    <Badge :class="cn(badgeClass)">
        {{ label }}
    </Badge>
</template>