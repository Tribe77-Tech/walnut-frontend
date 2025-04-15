<script setup lang="ts">
import { Hospital } from 'lucide-vue-next'
import { selectedHospital } from '@/mock/hospitals';
</script>

<template>
  <div class="flex items-center gap-2 px-3 py-2">
    <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
      <Hospital class="h-3 w-3" />
    </div>
    <span class="text-sm font-medium">{{ selectedHospital.label }}</span>
  </div>
</template>