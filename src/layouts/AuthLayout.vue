<script setup lang="ts">
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import AppShell from '@/components/AppShell.vue'
</script>

<template>
    <SidebarProvider>
        <AppShell>
            <main class="flex-1 overflow-auto bg-muted">
                <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <RouterView />
                </div>
            </main>
        </AppShell>

        <!-- Mobile Sidebar Toggle Button -->
        <div class="fixed bottom-4 right-4 md:hidden z-50">
            <SidebarTrigger class="sidebar-toggle-btn-mobile" />
        </div>
    </SidebarProvider>
</template>