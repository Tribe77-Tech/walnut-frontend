<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, ChevronsUpDown, Hospital, Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { hospitals,selectHospital,selectedHospital } from '@/mock/hospitals'



import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'



const showNewHospitalDialog = ref(false)
const newHospitalName = ref('')


</script>

<template>
    <Dialog v-model:open="showNewHospitalDialog">
        <div class="space-y-1 py-1">
      <div v-for="hospital in hospitals" :key="hospital.value"
           class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent"
           @click="selectHospital(hospital)">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <Hospital class="h-4 w-4" />
        </div>
        <div class="grid flex-1">
          <span class="text-sm font-medium leading-none">{{ hospital.label }}</span>
        </div>
        <Check v-if="selectedHospital.value === hospital.value" class="h-4 w-4" />
      </div>
      
      <DialogTrigger as-child>
        <div class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Plus class="h-4 w-4" />
          </div>
          <span class="text-sm font-medium text-muted-foreground">Add Hospital</span>
        </div>
      </DialogTrigger>
    </div>


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