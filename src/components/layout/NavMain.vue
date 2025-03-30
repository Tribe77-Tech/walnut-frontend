<script setup lang="ts">
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

// Define the navigation item type
interface NavItem {
    title: string
    href: string
    icon: Component
}

const route = useRoute()
const router = useRouter()
const { state } = useSidebar()

const props = defineProps<{
    items: NavItem[]
}>()

const isCollapsed = computed(() => state.value === 'collapsed')

// Check if the current route matches the item
const isRouteActive = (href: string) => {
    return route.path === href ||
        (href !== '/' && route.path.startsWith(href))
}

const navigateTo = (href: string) => {
    router.push(href)
}
</script>

<template>
    <div class="space-y-4">
        <div v-show="!isCollapsed" class="px-2">
            <h2 class="mb-2 px-2 text-xs font-semibold tracking-tight">Navigation</h2>
        </div>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <TooltipProvider v-if="isCollapsed" :delay-duration="0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarMenuButton
                                :class="cn('w-full justify-center', isRouteActive(item.href) && 'bg-sidebar-accent/50 text-sidebar-accent-foreground')"
                                @click="navigateTo(item.href)">
                                <component :is="item.icon" class="h-4 w-4"
                                    :class="isRouteActive(item.href) ? 'text-primary' : 'text-muted-foreground'" />
                                <span class="sr-only">{{ item.title }}</span>
                            </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ item.title }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <SidebarMenuButton v-else
                    :class="cn(isRouteActive(item.href) && 'bg-sidebar-accent/50 text-sidebar-accent-foreground')"
                    @click="navigateTo(item.href)">
                    <component :is="item.icon" class="h-4 w-4 mr-2"
                        :class="isRouteActive(item.href) ? 'text-primary' : 'text-muted-foreground'" />
                    {{ item.title }}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </div>
</template>

<style scoped>
/* Ensures proper alignment of menu items in collapsed state */
:deep(.sidebar-menu-button) {
    @apply w-full;
}
</style>