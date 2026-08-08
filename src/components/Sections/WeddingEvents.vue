<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";
import defaultHeaderEvents from "../../assets/images/IMG_4981.png";
import defaultBuildingIcon from "../../assets/images/img-building.png";

const themeStore = useThemeStore();

const headerEventsUrl = computed(() => {
  const override = themeStore.wedding?.theme_override?.images?.header_events;
  const fromTheme = themeStore.themeConfig?.images?.header_events;
  return override || fromTheme || defaultHeaderEvents;
});

const buildingIconUrl = computed(() => {
  const override = themeStore.wedding?.theme_override?.images?.building_icon;
  const fromTheme = themeStore.themeConfig?.images?.building_icon;
  return override || fromTheme || defaultBuildingIcon;
});

const isOpeningImage = computed(() => {
  const words = themeStore.wedding?.theme_override?.words;
  const images = themeStore.wedding?.theme_override?.images;

  if (words?.opening_message_type === "image" || words?.opening_type === "image") {
    return true;
  }
  if (words?.opening_message_type === "text" || words?.opening_type === "text") {
    return false;
  }

  const dedicatedImg = words?.opening_message_image || words?.opening_image || images?.opening_message || images?.opening_image;
  if (dedicatedImg) return true;

  const msg = words?.opening_message || defaultOpeningMessage;
  if (msg && typeof msg === "string") {
    const trimmed = msg.trim();
    const isUrl = /^https?:\/\//i.test(trimmed) || /^data:image\//i.test(trimmed) || /^\/storage\//i.test(trimmed) || /^\/uploads\//i.test(trimmed);
    const isImgExt = /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(trimmed);
    return isUrl || isImgExt;
  }

  return false;
});

const openingImageUrl = computed(() => {
  const words = themeStore.wedding?.theme_override?.words;
  const images = themeStore.wedding?.theme_override?.images;

  const dedicatedImg = words?.opening_message_image || words?.opening_image || images?.opening_message || images?.opening_image;
  if (dedicatedImg) return dedicatedImg;

  const msg = words?.opening_message || defaultOpeningMessage;
  if (msg && typeof msg === "string") {
    return msg.trim();
  }
  return defaultOpeningMessage;
});

const defaultOpeningMessage = `https://ik.imagekit.io/qinviVideo/IMG_1843.PNG`;

const openingMessage = computed(() => {
  return (
    themeStore.wedding?.theme_override?.words?.opening_message ||
    defaultOpeningMessage
  );
});

const parsedOpeningLines = computed(() => {
  const text = openingMessage.value;
  return text.split("\n").map((line) => {
    const trimmed = line.trim();
    const isSnellFont = /DATUK MOHD|DATOK MOHD/i.test(trimmed);
    return {
      text: line,
      isSnellFont,
    };
  });
});

type acaraTypes = {
  id: string;
  wedding_id: string;
  title: string;
  event_date: string;
  location_name: string;
  address: string;
  maps_url: string;
  sort_order: number;
  created_at: string;
  event_time?: string;
  google_calendar_url?: string;
  // Fallbacks for compatibility
  alamat?: string;
  lokasi?: string;
  namaAcara?: string;
  tanggal?: string;
  urlMap?: string;
  waktuMulai?: string;
  waktuSelesai?: string;
  ingatkanAcara?: string;
};

type acaraPropsTypes = {
  acara: Array<acaraTypes>;
};

const props = defineProps<acaraPropsTypes>();

const formattedEvents = computed(() => {
  return props.acara.map((e: acaraTypes) => {
    const rawDate = e.event_date || e.tanggal;
    let formattedDate = rawDate || "";
    // Format the date if it's a valid date string and has not been formatted yet (does not contain comma)
    if (rawDate && !isNaN(Date.parse(rawDate)) && !rawDate.includes(",")) {
      try {
        formattedDate = new Date(rawDate).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      } catch (err) {
        console.error("Error formatting date:", err);
      }
    }

    const parts = formattedDate ? formattedDate.split(",") : ["", ""];
    const hari = parts[0] ? parts[0].trim() : "";
    const tanggal = parts[1] ? parts[1].trim() : parts[0] || "";

    const rawJamSelesai = e.waktuSelesai?.split(":").splice(0, 2).join(":");
    const jamSelesai =
      rawJamSelesai === "23:59" || rawJamSelesai === "00:00"
        ? "Selesai"
        : rawJamSelesai;

    const title = e.title || e.namaAcara || "";
    const hasDanOrAnd = /\b(dan|and)\b/i.test(title);
    const rawLines = title.split(/[|\n]/).map((line) => line.trim()).filter(Boolean);
    const rawTitleLines: string[] = [];
    rawLines.forEach((line) => {
      const splitParts = line.split(/\s+(?=dan\b|and\b)/i).map((s) => s.trim()).filter(Boolean);
      rawTitleLines.push(...splitParts);
    });

    const titleLines = rawTitleLines.map((line) => {
      if (hasDanOrAnd) {
        return line
          .toLowerCase()
          .split(/\s+/)
          .map((word) => {
            if (word === "dan" || word === "and") {
              return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
      }
      return line.toUpperCase();
    });

    const jamMulai = e.waktuMulai?.split(":").splice(0, 2).join(":");
    let rawTime = "";
    if (e.event_time) {
      rawTime = e.event_time;
    } else if (jamMulai) {
      rawTime = `${jamMulai} WITA`;
      if (jamSelesai) {
        rawTime += ` - ${jamSelesai}`;
      }
    }
    const timeLines = rawTime
      ? rawTime.split(/[|\n]/).map((line) => line.trim()).filter(Boolean)
      : [];

    return {
      ...e,
      hari,
      tanggal,
      jamMulai,
      jamSelesai,
      titleLines,
      timeLines,
      hasDanOrAnd,
    };
  });
});

const openMap = (e: any): void => {
  const url = e.maps_url || e.urlMap;
  if (url) {
    window.open(url);
  }
};

const openAcara = (e: any): void => {
  const url = e.google_calendar_url || e.ingatkanAcara;
  if (url) {
    window.open(url);
  }
};
</script>

<template>
  <div class="flex flex-col items-center px-4 pt-16 pb-5">
    <div
      data-aos="zoom-in-up"
      data-aos-duration="1000"
      class="flex flex-col pt-20 pb-48 bg-container-shadow rounded-tema-jawa mb-10"
    >
      <div class="flex flex-col items-center">
        <img
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          :src="headerEventsUrl"
          alt="Qinvi Header Events"
          class="mb-1"
          width="75%"
        />
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="body-777"
        >
          With Love
        </p>
        <hr class="border-black my-4" style="width: 40%" />
        <img
          v-if="isOpeningImage"
          :src="openingImageUrl"
          alt="Opening Message"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="max-w-md w-full h-auto mx-auto mb-4 rounded-lg object-contain px-4"
        />
        <div
          v-else
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="caption-14 text-center mx-7 mb-4 flex flex-col items-center"
        >
          <template v-for="(line, idx) in parsedOpeningLines" :key="idx">
            <p
              v-if="line.isSnellFont"
              class="font-snell text-[22px] sm:text-[22px] font-bold tracking-wide my-1 text-center"
            >
              {{ line.text }}
            </p>
            <p v-else-if="line.text.trim()" class="leading-relaxed text-center">
              {{ line.text }}
            </p>
            <div v-else class="h-2"></div>
          </template>
        </div>
      </div>

      <!-- Events Loop -->
      <div
        v-for="(item, index) in formattedEvents"
        :key="item.id || index"
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="flex flex-col mt-2.5 items-center rounded-xl py-10 mx-8"
      >
        <p class="headline-21 mt-2 text-center">
          <span
            v-for="(line, lineIdx) in item.titleLines"
            :key="lineIdx"
            class="block"
            :style="
              lineIdx > 0
                ? (item.hasDanOrAnd ? { marginTop: '4px' } : { fontSize: '50%', marginTop: '4px', opacity: 0.8 })
                : {}
            "
          >
            {{ line }}
          </span>
        </p>
        <hr class="border-gold-10 mt-5 mb-7" style="width: 40%" />
        <p class="body-777 my-2">{{ item.hari }}</p>
        <p class="body-7 my-5">{{ item.tanggal }}</p>
        <p
          v-for="(timeLine, timeIdx) in item.timeLines"
          :key="timeIdx"
          class="event-time my-1"
        >
          {{ timeLine }}
        </p>

        <img
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          src="../../assets/images/img-building.png"
          width="128"
          alt="Qinvi Header Events"
          class="my-7"
        />
        <p
          class="body-7 text-center mt-2 mb-6"
          style="max-width: 300px"
        >
          {{ item.location_name || item.lokasi }}
        </p>
        <p
          class="body-77 text-center mt-2 mb-6"
          style="max-width: 300px"
        >
          {{ item.address || item.alamat }}
        </p>

        <div
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="flex flex-col items-center"
        >
          <button
            @click="openMap(item)"
            class="button-date bg-linear-btn px-8 py-4 rounded-3xl flex flex-row justify-center items-center space-x-2.5 transition-all my-4 mx-6"
          >
            <p class="body-6 text-white">
              {{ themeStore.isEnglish ? "Open Map" : "Lihat Peta" }}
            </p>
          </button>
          <button
            v-if="item.google_calendar_url || item.ingatkanAcara"
            @click="openAcara(item)"
            data-aos="zoom-in-up"
            data-aos-duration="2000"
            class="button-date bg-linear-btn px-8 py-4 rounded-3xl flex flex-row justify-center items-center space-x-2.5 transition-all my-4 mx-6"
          >
            <p class="body-6 text-white">
              {{
                themeStore.isEnglish ? "Save to Calendar" : "Simpan ke Kalender"
              }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background-size: 100% 100%;
}

.bg-linear-btn {
  background: linear-gradient(282.22deg, #000000 0%, #a98466 100%);
}

.event-time {
  font-family: var(--font-event_detail, "Cormorant Garamond");
  font-size: calc(14.4px * var(--font-scale-event_detail, 1));
  color: var(--color-event-detail-color, var(--color-text-dark, #1F1C1F));
}
</style>
