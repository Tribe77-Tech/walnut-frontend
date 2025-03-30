<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Home, Users, MessageSquare, UserPlus, Settings } from 'lucide-vue-next'
import UserNav from './UserNav.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

const searchQuery = ref('')
const searchExpanded = ref(false)
const { state } = useSidebar()
const route = useRoute()

// Get current navigation item
const currentPath = computed(() => route.path)
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
    {
        title: 'Settings',
        path: '/settings',
        icon: Settings,
    },
]

const currentNavItem = computed(() => {
    return navigation.find(item =>
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
    <header class="topbar">
        <div class="container">
            <div class="flex items-center">
                <!-- Sidebar Toggle Button -->
                <!-- <Button variant="ghost" size="icon" @click="toggleCollapsed" class="mr-2">
                    <ChevronLeft v-if="state === 'expanded'" class="h-5 w-5" />
                    <ChevronRight v-else class="h-5 w-5" />
                </Button> -->
                <SidebarTrigger />

                <Separator orientation="vertical" class="mr-2 h-4" />

                <!-- Current Navigation Item -->
                <h1 v-if="currentNavItem" class="font-semibold text-lg">{{ currentNavItem.title }}</h1>
                <!-- <h1 v-else class="font-semibold text-lg">Walnut Health</h1> -->
            </div>

            <div class="ml-auto flex items-center space-x-4">
                <!-- Collapsible Search -->
                <div class="relative">
                    <Button v-if="!searchExpanded" variant="ghost" size="icon" @click="toggleSearch" class="h-9 w-9">
                        <Search class="h-5 w-5" />
                    </Button>
                    <div v-else class="flex items-center relative">
                        <Search class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input id="search-input" type="search" placeholder="Search..." class="w-[200px] sm:w-[300px] h-9 rounded-md border border-input bg-background pl-9 pr-4
                                text-sm transition-all duration-200 placeholder:text-muted-foreground
                                focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                            v-model="searchQuery" @blur="searchExpanded = false" />
                    </div>
                </div>
                <ThemeSwitcher />
                <UserNav />
            </div>
        </div>
    </header>
</template>

<style scoped>
.topbar {
    @apply fixed top-0 right-0 z-40 bg-muted;
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
    left: v-bind('state === "expanded" ? "var(--sidebar-width)" : "var(--sidebar-width-icon)"');
    width: v-bind('state === "expanded" ? "calc(100% - var(--sidebar-width))" : "calc(100% - var(--sidebar-width-icon))"');
}

@media (max-width: 768px) {
    .topbar {
        @apply left-0 w-full;
    }
}

.container {
    @apply flex h-16 items-center justify-between px-6;
}

.search-input-expanded {
    @apply w-[200px] sm:w-[300px] h-9 rounded-md border border-input pl-9;
}
</style>