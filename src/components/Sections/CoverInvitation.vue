<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import images from "@/assets/images/cover.webp";
import TimerCountDown from "@/components/TimerCountdown.vue";
import { useSnackbar } from "vue3-snackbar";

const snackbar = useSnackbar();

type acaraTypes = {
  alamat: string;
  createdAt: string;
  id: number;
  lokasi: string;
  namaAcara: string;
  tanggal: string;
  updatedAt: string;
  urlMap: string;
  userId: number;
  waktuMulai: string;
  waktuSelesai: string;
};

type CountDownTypes = {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
  counterFunction: number | undefined;
};

interface CoverInvitationProps {
  mempelaiPria: string;
  mempelaiWanita: string;
  acara: Array<acaraTypes>;
}

const props = defineProps<CoverInvitationProps>();
const CoverImage: Ref<string> = ref(images);
const tanggal: Ref<string> = ref("-");
const CountDown: Ref<CountDownTypes> = ref({
  days: "0",
  hours: "0",
  minutes: "0",
  seconds: "0",
  counterFunction: 0,
});

const bindingData = (): void => {
  props.acara.map((e: acaraTypes) => {
    if (e.namaAcara == "Akad Nikah") {
      tanggal.value = new Date(e.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  });
};

const startCountDown = (): void => {
  const myInterval = setInterval(() => {
    const now = new Date().getTime();
    const countDownDate = new Date(tanggal.value).getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    if (distance > 0) {
      // Time calculations for days, hours, minutes and seconds
      CountDown.value.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      CountDown.value.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      CountDown.value.minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      CountDown.value.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      clearInterval(myInterval);
    }
  }, 1000);
};

const handleSave = (): void => {
  snackbar.add({
    type: "success",
    title: "Success",
    text: "Berhasil menyimpan tanggal acara",
    group: "5862a88b",
    count: 1,
  });
};

onMounted(() => {
  bindingData();
  startCountDown();
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div
      class="w-full h-2/3 md:h-2/3 bg-center bg-cover"
      :style="`background-image: url(${CoverImage})`"
    />
    <div
      class="relative h-1/3 md:h-1/3 flex flex-col justify-center items-center bg-brown-10"
    >
      <p class="caption-1 text-brown-70">We invite you to join our wedding</p>
      <div class="flex flex-row items-center space-x-3">
        <p class="headline-1 text-brown-70">{{ props.mempelaiWanita }}</p>
        <p class="headline-2 text-brown-70">and</p>
        <p class="headline-1 text-brown-70">{{ props.mempelaiPria }}</p>
      </div>
      <p class="caption-1 text-brown-70">{{ tanggal }}</p>
      <img src="@/assets/images/Flower1.png" class="absolute w-full h-full" />
      <TimerCountDown
        :days="CountDown.days"
        :hours="CountDown.hours"
        :minutes="CountDown.minutes"
        :seconds="CountDown.seconds"
      />
      <button
        @click="handleSave"
        class="button-date bg-brown-70 py-1.5 px-3 rounded-2xl flex flex-row items-center space-x-2.5 z-10"
      >
        <img
          src="@/assets/icons/icon-calendar.png"
          class="brightness-0 invert"
          height="18"
          width="18"
        />
        <span class="body-2 text-white">Save the Date</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.button-date {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
