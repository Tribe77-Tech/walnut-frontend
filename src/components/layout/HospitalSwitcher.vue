<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, ChevronsUpDown, Hospital, Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface Hospital {
    label: string
    value: string
}

const hospitals = [
    {
        label: "Spandan Nagpur",
        value: "spandan-nagpur"
    },
    {
        label: "Jupiter Thane",
        value: "jupiter-thane"
    }
]

const { state, isMobile } = useSidebar()
const isCollapsed = computed(() => state.value === 'collapsed')
const selectedHospital = ref(hospitals[0])
const open = ref(false)
const showNewHospitalDialog = ref(false)
const newHospitalName = ref('')

function selectHospital(hospital: Hospital) {
    selectedHospital.value = hospital
    open.value = false
}
</script>

<template>
    <Dialog v-model:open="showNewHospitalDialog">
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu v-model:open="open">
                    <DropdownMenuTrigger as-child>
                        <SidebarMenuButton size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div
                                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary/10 text-primary ring-1 ring-primary/20">
                                <Hospital class="size-4" />
                            </div>
                            <div v-if="!isCollapsed" class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">
                                    {{ selectedHospital.label }}
                                </span>
                            </div>
                            <ChevronsUpDown v-if="!isCollapsed" class="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start" :side="isMobile ? 'bottom' : 'right'" :side-offset="4">
                        <DropdownMenuLabel class="text-xs text-muted-foreground">
                            Hospitals
                        </DropdownMenuLabel>
                        <DropdownMenuItem v-for="hospital in hospitals" :key="hospital.value" class="gap-2 p-2"
                            @click="selectHospital(hospital)">
                            <Check :class="cn(
                                'mr-2 h-4 w-4',
                                selectedHospital.value === hospital.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            )" />
                            {{ hospital.label }}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogTrigger as-child>
                            <DropdownMenuItem class="gap-2 p-2">
                                <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus class="size-4" />
                                </div>
                                <div class="font-medium text-muted-foreground">
                                    Add Hospital
                                </div>
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Hospital</DialogTitle>
                <DialogDescription>
                    Add a new hospital to your organization.
                </DialogDescription>
            </DialogHeader>
            <div>
                <div class="space-y-4 py-2 pb-4">
                    <div class="space-y-2">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Hospital name
                        </label>
                        <input v-model="newHospitalName" placeholder="Enter hospital name"
                            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <button type="button"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    @click="showNewHospitalDialog = false">
                    Add Hospital
                </button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
/* Fix z-index for popover content */
:deep(.tooltip, .popover-content) {
    z-index: 50;
}
</style>