<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar
} from '@/components/ui/sidebar'
import NavMain from '@/components/layout/NavMain.vue'
import HospitalSwitcher from './HospitalSwitcher.vue'
import WalnutBranding from './WalnutBranding.vue'
import SettingsMenu from './SettingsMenu.vue'
import { mainNavItems } from '@/config/navigation'
import { computed } from 'vue'
import SidebarHospitalDisplay from './SidebarHospitalDisplay.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})

const { state } = useSidebar()
const isCollapsed = computed(() => state.value === 'collapsed')
</script>

<template>
    <Sidebar v-bind="props" class="sidebar-container">
        <SidebarHeader>
            <WalnutBranding />
            <div class="py-4" v-if="!isCollapsed">
                <SidebarHospitalDisplay />
            </div>
        </SidebarHeader>

        <SidebarContent :class="isCollapsed ? 'px-2 py-4' : 'p-4'">
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter :class="isCollapsed ? 'p-2 py-4 border-t' : 'p-4 border-t'">
            <SettingsMenu />
        </SidebarFooter>

        <SidebarRail />
    </Sidebar>
</template>

<style scoped>
.sidebar-container {
    @apply overflow-hidden;
}

:deep(.sidebar-menu-button) {
    @apply transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground;
}

:deep([data-state=collapsed]) {
    @apply w-[var(--sidebar-width-icon)];
}

:deep([data-state=collapsed] .sidebar-menu-button) {
    @apply justify-center items-center px-2;
}

:deep([data-state=collapsed] .sidebar-menu-button svg) {
    @apply mr-0;
}

:deep(.router-link-active) {
    @apply bg-sidebar-accent/50 text-sidebar-accent-foreground font-medium;
}

:deep([data-state=open]) {
    @apply z-50;
}
</style>