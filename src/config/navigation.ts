import {
    Home,
    Users,
    MessageSquare,
    UserPlus,
    Settings,
} from 'lucide-vue-next'

// Main navigation items for the sidebar
export const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/',
        icon: Home,
    },
    {
        title: 'Patients',
        href: '/patients',
        icon: Users,
    },
    {
        title: 'Messages',
        href: '/chat',
        icon: MessageSquare,
    },
    {
        title: 'Team',
        href: '/team',
        icon: UserPlus,
    },
]

// Settings navigation (moved to the footer)
export const settingsNavItem = {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
} 