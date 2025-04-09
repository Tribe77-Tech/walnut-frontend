<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import LoginForm from '@/components/LoginForm.vue';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import {
    Card,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Leaf } from 'lucide-vue-next';

// Update image data structure
const imageData = [
    { src: '/art/file-analysis_dg81.svg', text: 'Analyze patient data effectively' },
    { src: '/art/medical-research_pze7.svg', text: 'Stay updated with medical research' },
    { src: '/art/doctor_aum1.svg', text: 'Connect with specialists' },
    { src: '/art/medicine_hqqg.svg', text: 'Manage prescriptions seamlessly' },
    { src: '/art/doctors_djoj.svg', text: 'Collaborate with your team' },
    { src: '/art/medical-care_7m9g.svg', text: 'Provide comprehensive medical care' }
];

const plugin = Autoplay({
    delay: 10000, // Cycle every 10 seconds (as per user change)
    stopOnInteraction: false,
})
</script>

<template>
    <div class="grid min-h-svh lg:grid-cols-2">
        <div class="relative hidden items-center justify-center bg-muted p-10 lg:flex">
            <Carousel class="w-full max-w-md" :plugins="[plugin]" :opts="{
                loop: true,
            }">
                <CarouselContent>
                    <CarouselItem v-for="(item, index) in imageData" :key="index">
                        <Card class="overflow-hidden">
                            <CardContent class="flex aspect-square items-center justify-center p-6">
                                <img :src="item.src" :alt="item.text"
                                    class="h-full w-full object-contain dark:brightness-[0.8] dark:contrast-125 dark:grayscale-0">
                            </CardContent>
                            <CardFooter class="justify-center bg-background/50 p-4">
                                <p class="text-sm font-medium text-foreground">{{ item.text }}</p>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious class="absolute left-[-50px] top-1/2 -translate-y-1/2" />
                <CarouselNext class="absolute right-[-50px] top-1/2 -translate-y-1/2" />
            </Carousel>
        </div>
        <div class="flex flex-col gap-4 p-6 md:p-10">
            <div class="flex justify-center gap-2 md:justify-start">
                <a href="#" class="flex items-center gap-2 font-medium">
                    <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Leaf class="h-5 w-5" />
                    </div>
                    Walnut Health
                </a>
            </div>
            <div class="flex flex-1 items-center justify-center">
                <div class="w-full max-w-xs">
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
</template>