<template>
  <div class="flex flex-row space-x-1.5 my-6 z-30">
    <div
      class="flex flex-col items-center py-2 px-3.5 border border-black bg-linear rounded-lg"
      style="width: 66px"
    >
      <p class="body-5 text-black">{{ days }}</p>
      <p class="caption-12 text-black">{{ themeStore.isEnglish ? 'Days' : 'Hari' }}</p>
    </div>
    <div
      class="flex flex-col items-center py-2 px-3.5 border border-black bg-linear rounded-lg"
      style="width: 66px"
    >
      <p class="body-5 text-black">{{ hours }}</p>
      <p class="caption-12 text-black">{{ themeStore.isEnglish ? 'Hours' : 'Jam' }}</p>
    </div>
    <div
      class="flex flex-col items-center py-2 px-3.5 border border-black bg-linear rounded-lg"
      style="width: 66px"
    >
      <p class="body-5 text-black">{{ minutes }}</p>
      <p class="caption-12 text-black">{{ themeStore.isEnglish ? 'Minutes' : 'Menit' }}</p>
    </div>
    <div
      class="flex flex-col items-center py-2 px-3.5 border border-black bg-linear rounded-lg"
      style="width: 66px"
    >
      <p class="body-5 text-black">{{ seconds }}</p>
      <p class="caption-12 text-black">{{ themeStore.isEnglish ? 'Seconds' : 'Detik' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

interface CountDownTypes {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}

const props = defineProps<CountDownTypes>();
</script>

<style scoped>
.bg-linear {
  background: rgba(255, 255, 255, 0.58);
}
</style>
