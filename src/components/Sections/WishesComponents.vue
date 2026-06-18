<script setup lang="ts">
import { defineProps, computed } from "vue";

interface WishProps {
  username: string;
  date: string;
  wish?: string;
}

const props = defineProps<WishProps>();

const formattedDate = computed(() => {
  if (!props.date) return "";

  // If it's already a relative date description, keep it
  if (
    /\d+\s+(hour|minute|second|day|ago|jam|menit|detik|lalu)/i.test(props.date)
  ) {
    return props.date;
  }

  const d = new Date(props.date);
  if (isNaN(d.getTime())) {
    return props.date;
  }

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
});
</script>

<template>
  <div class="flex flex-col">
    <p class="caption-2 text-brown-30">{{ props.username }}</p>
    <p class="caption-3 text-grey-10 my-1">{{ formattedDate }}</p>
    <p class="caption-4 text-brown-30">
      {{ props.wish }}
    </p>
    <hr class="my-2" />
  </div>
</template>
