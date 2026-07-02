<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import type { Ref } from "vue";
import TimerCountDown from "@/components/TimerCountdown.vue";

type acaraTypes = {
  id: string | number;
  wedding_id?: string;
  title?: string;
  event_date?: string;
  location_name?: string;
  address?: string;
  maps_url?: string;
  sort_order?: number;
  created_at?: string;
  event_time?: string;
  google_calendar_url?: string;
  alamat?: string;
  createdAt?: string;
  lokasi?: string;
  namaAcara?: string;
  tanggal?: string;
  updatedAt?: string;
  urlMap?: string;
  userId?: number;
  waktuMulai?: string;
  waktuSelesai?: string;
  ingatkanAcara?: string;
};

type CountDownTypes = {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
};

interface CoverInvitationProps {
  acara: Array<acaraTypes>;
  countdownDate?: string | null;
  mempelaiPria?: string;
  mempelaiWanita?: string;
}

const props = defineProps<CoverInvitationProps>();
const themeStore = useThemeStore();
const groomFirst = computed(() => {
  return themeStore.wedding?.order_groom_first !== false;
});

const spouseImgUrl = computed(() => {
  return (
    themeStore.wedding?.image_spouse ||
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Untitled1057_20260612144610.webp?updatedAt=1781262749609"
  );
});

const tanggalResepsi: Ref<string> = ref("");
const CountDownResepsi: Ref<CountDownTypes> = ref({
  days: "0",
  hours: "0",
  minutes: "0",
  seconds: "0",
});

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

const bindingData = (): void => {
  if (props.countdownDate) {
    tanggalResepsi.value = new Date(props.countdownDate).toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    return;
  }
  let found = false;
  props.acara.forEach((e: acaraTypes) => {
    const title = e.title || e.namaAcara || "";
    const rawDate = e.event_date || e.tanggal;
    if (
      title.toLowerCase().includes("akad") ||
      title.toLowerCase().includes("pemberkatan")
    ) {
      if (rawDate) {
        tanggalResepsi.value = new Date(rawDate).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        found = true;
      }
    }
  });
  if (!found && props.acara.length > 0) {
    const rawDate = props.acara[0].event_date || props.acara[0].tanggal;
    if (rawDate) {
      tanggalResepsi.value = new Date(rawDate).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }
};

const startCountDownResepsi = (): void => {
  if (intervalId.value) clearInterval(intervalId.value);
  intervalId.value = setInterval(() => {
    const now = new Date().getTime();
    const targetDate = props.countdownDate || tanggalResepsi.value;
    const countDownDate = new Date(targetDate).getTime();
    const distance = countDownDate - now;

    if (distance > 0) {
      CountDownResepsi.value.days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );
      CountDownResepsi.value.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      CountDownResepsi.value.minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      CountDownResepsi.value.seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );
    } else {
      clearInterval(intervalId.value!);
      intervalId.value = null;
    }
  }, 1000);
};

const mempelaiPria: Ref<string> = ref("-");
const mempelaiWanita: Ref<string> = ref("-");

const route = useRoute();

const capitalize = (text: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const splittingUsername = (username: any): void => {
  if (props.mempelaiPria && props.mempelaiPria !== "-") {
    mempelaiPria.value = props.mempelaiPria;
  } else if (typeof username === "string") {
    const result = username.split("-");
    mempelaiPria.value = capitalize(result[0] || "");
  } else {
    mempelaiPria.value = "";
  }

  if (props.mempelaiWanita && props.mempelaiWanita !== "-") {
    mempelaiWanita.value = props.mempelaiWanita;
  } else if (typeof username === "string") {
    const result = username.split("-");
    mempelaiWanita.value = capitalize(result[1] || "");
  } else {
    mempelaiWanita.value = "";
  }
};

onMounted(() => {
  const username: string | null = route.params?.username as string;
  splittingUsername(username);
  bindingData();
  startCountDownResepsi();
});

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

watch(
  () => [props.acara, props.countdownDate],
  () => {
    bindingData();
  },
  { deep: true }
);

watch(
  () => [props.mempelaiPria, props.mempelaiWanita],
  ([pria, wanita]) => {
    if (pria && pria !== "-") {
      mempelaiPria.value = pria;
    }
    if (wanita && wanita !== "-") {
      mempelaiWanita.value = wanita;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col w-full text-center justify-center text-white py-6">
    <div
      data-aos="zoom-in-up"
      data-aos-duration="1000"
      class="flex flex-col mx-4 sm:mx-9 pb-10 pt-24 bg-container-shadow rounded-tema-jawa px-4 sm:px-7"
    >
      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="headline-99 mb-4 text-black"
        :style="{
          fontFamily: 'var(--font-accent)',
          fontSize: 'calc(32px * var(--font-scale-accent, 1))',
        }"
      >
        {{ themeStore.wedding?.theme_override?.words?.the_wedding_of || 'The Wedding Of' }}
      </p>
      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="headline-11 mb-10"
        :style="{
          fontFamily: 'var(--font-spouse_nickname, var(--font-spouse-nickname, var(--font-headline)))',
          fontSize: 'calc(48px * var(--font-scale-spouse_nickname, var(--font-scale-spouse-nickname, var(--font-scale-headline, 1))))'
        }"
      >
        {{ groomFirst ? mempelaiPria : mempelaiWanita }}
      </p>

      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="headline-11 mb-10"
        :style="{
          fontFamily: 'var(--font-spouse_nickname, var(--font-spouse-nickname, var(--font-headline)))',
          fontSize: 'calc(48px * var(--font-scale-spouse_nickname, var(--font-scale-spouse-nickname, var(--font-scale-headline, 1))))'
        }"
      >
        &
      </p>
      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="headline-11 mb-10"
        :style="{
          fontFamily: 'var(--font-spouse_nickname, var(--font-spouse-nickname, var(--font-headline)))',
          fontSize: 'calc(48px * var(--font-scale-spouse_nickname, var(--font-scale-spouse-nickname, var(--font-scale-headline, 1))))'
        }"
      >
        {{ groomFirst ? mempelaiWanita : mempelaiPria }}
      </p>
      <img
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        :src="spouseImgUrl"
        alt="Qinvi Spouses"
        class="rounded-xl"
      />
      <div class="flex flex-col justify-center items-center pt-10">
        <TimerCountDown
          :days="CountDownResepsi.days"
          :hours="CountDownResepsi.hours"
          :minutes="CountDownResepsi.minutes"
          :seconds="CountDownResepsi.seconds"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.headline-16 {
  color: #1f1c1f;
}
.headline-11 {
  color: #424242;
}
.background-linear {
  background: linear-gradient(
    0deg,
    rgba(255, 247, 239, 0.47) 500%,
    rgba(244, 234, 225, 0.37) 500%
  );
}
</style>
