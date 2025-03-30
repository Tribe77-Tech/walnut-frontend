<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
    class?: string
    viewportClass?: string
}>(), {
    class: '',
    viewportClass: ''
})

const rootClass = computed(() =>
    cn('relative overflow-hidden', props.class)
)

const viewportClass = computed(() =>
    cn('h-full w-full rounded-[inherit]', props.viewportClass)
)
</script>

<template>
    <div :class="rootClass">
        <div :class="viewportClass">
            <slot />
        </div>
    </div>
</template>