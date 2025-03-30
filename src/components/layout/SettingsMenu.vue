<script setup lang="ts">
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { settingsNavItem } from '@/config/navigation'

const route = useRoute()
const router = useRouter()
const { state } = useSidebar()
const isCollapsed = computed(() => state.value === 'collapsed')

// Check if the current route matches the settings page
const isRouteActive = (href: string) => {
    return route.path === href ||
        (href !== '/' && route.path.startsWith(href))
}

const navigateTo = (href: string) => {
    router.push(href)
}
</script>

<template>
    <div class="space-y-2">
        <div v-show="!isCollapsed" class="px-2">
            <h2 class="px-2 text-xs font-semibold tracking-tight">Settings</h2>
        </div>
        <SidebarMenu>
            <SidebarMenuItem>
                <TooltipProvider v-if="isCollapsed" :delay-duration="0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <SidebarMenuButton
                                :class="cn('w-full justify-center',
                                    isRouteActive(settingsNavItem.href) && 'bg-sidebar-accent/50 text-sidebar-accent-foreground')"
                                @click="navigateTo(settingsNavItem.href)">
                                <component :is="settingsNavItem.icon" class="h-4 w-4"
                                    :class="isRouteActive(settingsNavItem.href) ? 'text-primary' : 'text-muted-foreground'" />
                                <span class="sr-only">{{ settingsNavItem.title }}</span>
                            </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ settingsNavItem.title }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <SidebarMenuButton v-else
                    :class="cn(isRouteActive(settingsNavItem.href) && 'bg-sidebar-accent/50 text-sidebar-accent-foreground')"
                    @click="navigateTo(settingsNavItem.href)">
                    <component :is="settingsNavItem.icon" class="h-4 w-4 mr-2"
                        :class="isRouteActive(settingsNavItem.href) ? 'text-primary' : 'text-muted-foreground'" />
                    {{ settingsNavItem.title }}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </div>
</template>