<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
    Menu,
    Home,
    Users,
    MessageSquare,
    UserPlus,
    Settings,
    Bell,
    Search,
    ChevronDown,
    X
} from 'lucide-vue-next'

// Import ShadCN components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const route = useRoute()
const isCollapsed = ref(false)
const showMobileMenu = ref(false)
const showNotifications = ref(false)

const navigation = [
    {
        name: 'Dashboard',
        path: '/',
        icon: Home,
        description: 'Overview and analytics'
    },
    {
        name: 'Patients',
        path: '/patients',
        icon: Users,
        description: 'Manage patient records'
    },
    {
        name: 'Messages',
        path: '/chat',
        icon: MessageSquare,
        description: 'Chat with patients'
    },
    {
        name: 'Team',
        path: '/team',
        icon: UserPlus,
        description: 'Manage healthcare team'
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: Settings,
        description: 'App preferences'
    }
]
</script>

<template>
    <!-- Mobile Navigation -->
    <Sheet v-model:open="showMobileMenu">
        <SheetTrigger as-child>
            <Button variant="ghost" class="lg:hidden">
                <Menu class="h-6 w-6" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" class="p-0 w-[300px]">
            <nav class="flex flex-col h-full">
                <div class="px-3 py-2">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                            <span class="text-xl font-bold text-primary">W</span>
                        </div>
                        <h2 class="text-lg font-semibold">Walnut Health nav1</h2>
                    </div>
                    <div class="relative">
                        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input type="search" placeholder="Search..."
                            class="w-full pl-8 pr-2 py-1 text-sm rounded-md bg-secondary" />
                    </div>
                </div>
                <Separator />
                <ScrollArea class="flex-1">
                    <div class="p-2">
                        <router-link v-for="item in navigation" :key="item.path" :to="item.path" :class="[
                            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                            route.path === item.path
                                ? 'bg-secondary'
                                : 'hover:bg-secondary/80'
                        ]">
                            <component :is="item.icon" class="h-4 w-4" />
                            {{ item.name }}
                        </router-link>
                    </div>
                </ScrollArea>
                <Separator />
                <div class="p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" class="w-full justify-start gap-2">
                                <Avatar class="h-8 w-8">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                                    <AvatarFallback>DS</AvatarFallback>
                                </Avatar>
                                <div class="text-left">
                                    <div class="text-sm font-medium">Dr. Smith</div>
                                    <div class="text-xs text-muted-foreground">Cardiologist</div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" class="w-[200px]">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="text-red-600">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </SheetContent>
    </Sheet>

    <!-- Desktop Sidebar -->
    <nav class="hidden lg:flex flex-col w-[300px] min-h-screen border-r bg-background fixed left-0 top-0">
        <div class="px-3 py-2">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                    <span class="text-xl font-bold text-primary">W</span>
                </div>
                <h2 class="text-lg font-semibold">Walnut Health nav2</h2>
            </div>
            <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input type="search" placeholder="Search..."
                    class="w-full pl-8 pr-2 py-1 text-sm rounded-md bg-secondary" />
            </div>
        </div>
        <Separator />
        <ScrollArea class="flex-1">
            <div class="p-2">
                <router-link v-for="item in navigation" :key="item.path" :to="item.path" :class="[
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                    route.path === item.path
                        ? 'bg-secondary'
                        : 'hover:bg-secondary/80'
                ]">
                    <component :is="item.icon" class="h-4 w-4" />
                    {{ item.name }}
                </router-link>
            </div>
        </ScrollArea>
        <Separator />
        <div class="p-3">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="w-full justify-start gap-2">
                        <Avatar class="h-8 w-8">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                            <AvatarFallback>DS</AvatarFallback>
                        </Avatar>
                        <div class="text-left">
                            <div class="text-sm font-medium">Dr. Smith</div>
                            <div class="text-xs text-muted-foreground">Cardiologist</div>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" class="w-[200px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="text-red-600">Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>

    <!-- Top Header -->
    <header class="fixed top-0 right-0 z-40 h-16 bg-white border-b transition-all duration-300"
        :class="['left-0 lg:left-64']">
        <div class="h-full px-4 flex items-center justify-between">
            <!-- Search Bar -->
            <div class="hidden md:flex items-center flex-1 max-w-xl">
                <div class="relative w-full">
                    <Search class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input type="search" placeholder="Search patients, team members..."
                        class="pl-10 pr-4 py-2 w-full bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
            </div>

            <!-- Right Side -->
            <div class="flex items-center gap-4">
                <!-- Notifications -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="icon" class="relative">
                            <Bell class="h-5 w-5" />
                            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div class="p-4 text-sm text-gray-500">
                            No new notifications
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <!-- User Menu -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" class="gap-2">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                                <AvatarFallback>DS</AvatarFallback>
                            </Avatar>
                            <div class="hidden lg:block text-left">
                                <div class="text-sm font-medium">Dr. Smith</div>
                                <div class="text-xs text-gray-500">Cardiologist</div>
                            </div>
                            <ChevronDown class="h-4 w-4 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>

    <!-- Main Content Wrapper -->
    <main class="lg:pl-[300px] pt-16">
        <div class="container mx-auto p-6">
            <slot></slot>
        </div>
    </main>
</template>