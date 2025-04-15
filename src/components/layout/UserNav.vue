<script setup lang="ts">
import { ref } from 'vue'
import { LogOut, Settings, User } from 'lucide-vue-next'
import HospitalSwitcher from './HospitalSwitcher.vue'

const open = ref(false)

const user = {
    name: 'Dr. John Doe',
    email: 'john.doe@walnut.health',
    image: '👨‍⚕️'
}
</script>

<template>
    <div class="relative">
        <button class="flex h-8 w-8 items-center justify-center rounded-full bg-muted" @click="open = !open">
            <span class="text-sm">{{ user.image }}</span>
            <span class="sr-only">Toggle user menu</span>
        </button>
        <div v-if="open" class="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border bg-popover p-2 shadow-md">
            <div class="flex items-center justify-start gap-2 p-2">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <span class="text-sm">{{ user.image }}</span>
                </div>
                <div class="space-y-1">
                    <p class="text-sm font-medium leading-none">{{ user.name }}</p>
                    <p class="text-xs leading-none text-muted-foreground">
                        {{ user.email }}
                    </p>
                </div>
            </div>
            <div class="mt-2 border-t pt-2">
        <p class="px-2 text-xs font-medium text-muted-foreground">Hospitals</p>
        <HospitalSwitcher />
      </div>
            <div class="mt-2 border-t">
                <button
                    class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                    <Settings class="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </button>
                <button
                    class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                    <User class="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </button>
                <button
                    class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
                    <LogOut class="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    </div>
</template>