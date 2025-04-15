<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Home, Users, MessageSquare, UserPlus } from 'lucide-vue-next'
import UserNav from './layout/UserNav.vue'
import ThemeSwitcher from './layout/ThemeSwitcher.vue'
import WalnutBranding from './layout/WalnutBranding.vue'
import SettingsMenu from './layout/SettingsMenu.vue'
import SidebarHospitalDisplay from './layout/SidebarHospitalDisplay.vue'
import { useRoute } from 'vue-router'
import { Separator } from '@/components/ui/separator'
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

// Navigation items
const navigation = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Home,
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: Users,
  },
  {
    title: 'Messages',
    path: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Team',
    path: '/team',
    icon: UserPlus,
  },
]

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'offcanvas',
  variant: 'inset',
})

const searchQuery = ref('')
const searchExpanded = ref(false)
const { state } = useSidebar()
const route = useRoute()
const isCollapsed = computed(() => state.value === 'collapsed')

const currentPath = computed(() => route.path)
const currentNavItem = computed(() => {
  return navigation.find(
    (item) =>
      currentPath.value === item.path ||
      (item.path !== '/' && currentPath.value.startsWith(item.path))
  )
})

function toggleSearch() {
  searchExpanded.value = !searchExpanded.value
  if (searchExpanded.value) {
    // Focus the input after expansion
    setTimeout(() => {
      document.getElementById('search-input')?.focus()
    }, 100)
  }
}
</script>

<template>
  <!-- Shell Layout (Teams-like container) -->
  <div class="shell-layout">
    <!-- Left Rail / Sidebar -->
    <div class="sidebar-wrapper">
      <!-- The collapsible sidebar from your custom shadcn-based components -->
      <Sidebar v-bind="props" class="sidebar-container">
        <SidebarHeader>
          <!-- App Branding at top, akin to Teams "App" branding -->
          <WalnutBranding />
          <!-- Optional hospital/organization display in expanded mode -->
          <div class="py-4" v-if="!isCollapsed">
            <SidebarHospitalDisplay />
          </div>
        </SidebarHeader>

        <SidebarContent :class="isCollapsed ? 'px-2 py-4' : 'p-4'">
          <nav class="sidebar-nav">
            <router-link
              v-for="item in navigation"
              :key="item.path"
              :to="item.path"
              :class="[
                'sidebar-menu-button flex items-center py-2 px-3 rounded-md w-full',
                currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))
                  ? 'router-link-active'
                  : ''
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              <span v-if="!isCollapsed">{{ item.title }}</span>
            </router-link>
          </nav>
        </SidebarContent>

        <SidebarFooter :class="isCollapsed ? 'p-2 py-4 border-t' : 'p-4 border-t'">
          <SettingsMenu />
        </SidebarFooter>

        <!-- The thin rail shown when collapsed, etc. -->
        <SidebarRail />
      </Sidebar>
    </div>

    <!-- Main Wrapper (topbar + content) -->
    <div class="main-wrapper">
      <!-- Top bar reminiscent of Teams top nav -->
      <header class="topbar">
        <div class="container">
          <div class="flex items-center">
            <SidebarTrigger />

            <!-- A subtle divider -->
            <Separator orientation="vertical" class="mr-2 h-4" />

            <!-- Current Navigation Item Title -->
            <h1 v-if="currentNavItem" class="font-semibold text-lg">
              {{ currentNavItem.title }}
            </h1>
          </div>

          <div class="ml-auto flex items-center space-x-4">
            <!-- Collapsible Search -->
            <div class="relative">
              <!-- “Search” Icon button if collapsed -->
              <Button
                v-if="!searchExpanded"
                variant="ghost"
                size="icon"
                @click="toggleSearch"
                class="h-9 w-9"
              >
                <Search class="h-5 w-5" />
              </Button>

              <!-- Expanded Search bar -->
              <div v-else class="flex items-center relative">
                <Search
                  class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
                />
                <input
                  id="search-input"
                  type="search"
                  placeholder="Search..."
                  class="search-input"
                  v-model="searchQuery"
                  @blur="searchExpanded = false"
                />
              </div>
            </div>

            <!-- Theme Switcher & User Nav -->
            <ThemeSwitcher />
            <UserNav />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="content-container">
        <main class="page-content">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 
  -----------------------------------------------------------
  GENERAL LAYOUT 
  -----------------------------------------------------------
*/
.shell-layout {
  /* A subtle Teams-like background around the shell */
  @apply flex h-screen w-full overflow-hidden bg-muted/30;
}

/* Let’s mimic how Teams has a narrower rail on the left */
.sidebar-wrapper {
  @apply pr-4;
}

.sidebar-container {
  @apply overflow-hidden z-40 bg-background border shadow-sm;

  /* Typically, Teams left rail is narrower. 
     We'll keep the default 240px expanded / 64px collapsed from your code. */
  --sidebar-width: 240px;
  --sidebar-width-icon: 64px;
}

.main-wrapper {
  @apply flex flex-col flex-1 h-full overflow-hidden transition-all;
  width: calc(100% - var(--sidebar-width) - 1rem);
}

:deep([data-state=collapsed]) + .main-wrapper {
  width: calc(100% - var(--sidebar-width-icon) - 1rem);
}

/* 
  -----------------------------------------------------------
  TOP BAR (Teams-like dark or subdued color, subtle border) 
  -----------------------------------------------------------
*/
.topbar {
  @apply w-full mb-4;
  height: 64px;
  /* If you want a more Teams-specific color:
     @apply bg-[#3f3f46] text-white border-none; */
}

.container {
  @apply flex h-16 items-center justify-between px-4;
}

/* 
  -----------------------------------------------------------
  CONTENT WRAPPER 
  -----------------------------------------------------------
*/
.content-container {
  @apply flex-1 flex flex-col overflow-hidden bg-background border shadow-sm rounded-lg;
  /* To remove rounding (closer to Teams):
     @apply rounded-none; 
  */
}

.page-content {
  @apply flex-1 overflow-auto p-6 bg-muted;
  /* If you prefer a single color background for the main content:
     @apply bg-background;
  */
}

/* 
  -----------------------------------------------------------
  SIDEBAR NAV STYLING 
  -----------------------------------------------------------
*/
.sidebar-nav {
  @apply flex flex-col space-y-1;
}

:deep(.sidebar-menu-button) {
  @apply transition-colors hover:bg-accent hover:text-accent-foreground;
}

/* Highlight active route item (Teams uses a subtle highlight) */
:deep(.router-link-active) {
  @apply bg-accent text-accent-foreground font-medium;
}

/* Collapsed states for your custom sidebar */
:deep([data-state=collapsed]) {
  @apply w-[var(--sidebar-width-icon)];
}

:deep([data-state=collapsed] .sidebar-menu-button) {
  @apply justify-center items-center px-2;
}

:deep([data-state=collapsed] .sidebar-menu-button svg) {
  @apply mr-0;
}

:deep([data-state=open]) {
  @apply z-50;
}

/* 
  -----------------------------------------------------------
  SEARCH INPUT STYLING 
  -----------------------------------------------------------
*/
.search-input {
  @apply w-[200px] sm:w-[300px] h-9 rounded-md border border-input
    bg-background pl-9 pr-4 text-sm transition-all duration-200
    placeholder:text-muted-foreground focus:outline-none focus:ring-2
    focus:ring-ring focus:border-ring;
}

/* 
  -----------------------------------------------------------
  RESPONSIVE ADJUSTMENTS 
  -----------------------------------------------------------
*/
@media (max-width: 768px) {
  .shell-layout {
    @apply p-0;
  }

  .sidebar-wrapper {
    @apply pr-0;
  }

  .sidebar-container {
    @apply fixed -left-full rounded-none;
  }

  :deep([data-state=open].sidebar-container) {
    @apply left-0;
  }

  .main-wrapper {
    @apply w-full;
  }

  .topbar {
    @apply rounded-none mb-0;
  }

  .content-container {
    @apply rounded-none;
  }
}
</style>
