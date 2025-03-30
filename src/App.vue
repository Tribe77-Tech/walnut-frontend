<script setup lang="ts">
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'

// The sidebar state is now handled by the sidebar components
// No need for custom state tracking
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <TopBar />
      <main class="flex-1 overflow-auto p-6 pt-20 bg-muted">
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <RouterView />
        </div>
      </main>
    </SidebarInset>

    <!-- Mobile Sidebar Toggle Button - Using SidebarTrigger component -->
    <div class="fixed bottom-4 right-4 md:hidden z-50">
      <SidebarTrigger class="sidebar-toggle-btn-mobile" />
    </div>
  </SidebarProvider>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  @apply bg-background;
}

:root {
  --sidebar-width: 240px;
  --sidebar-width-icon: 64px;
}

.sidebar-toggle-btn {
  @apply h-7 w-7 flex items-center justify-center bg-card text-muted-foreground rounded-full shadow-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors;
}

.sidebar-toggle-btn-mobile {
  @apply h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors;
}
</style>
