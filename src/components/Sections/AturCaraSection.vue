<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  words?: any;
}>();

const primaryColor = computed(() => {
  return 'var(--color-atur-cara-primary, var(--color-primary, #1F1C1F))';
});

const timeColor = computed(() => {
  return 'var(--color-atur-cara-time, var(--color-atur-cara-primary, var(--color-primary, #1F1C1F)))';
});

const textColor = computed(() => {
  return 'var(--color-text-body, #1F1C1F)';
});

const showSection = computed(() => {
  return props.words?.atur_cara_show === true || props.words?.atur_cara_show === "true";
});

const sectionTitle = computed(() => {
  return props.words?.atur_cara_title || "Atur Cara Majlis";
});

interface AturCaraItem {
  time: string;
  activity: string;
}

const parsedItems = computed<AturCaraItem[]>(() => {
  const raw = props.words?.atur_cara_items;
  // Default values matching mockup
  const defaultText =
    "07:00 PM - Ketibaan tetamu\n08:00 PM - Ketibaan pengantin\n08:15 PM - Bacaan doa\n08:30 PM - Acara potong kek\n09:00 PM - Jamuan makan malam\n09:30 PM - Sesi bergambar\n10:00 PM - Sesi bergambar bebas\n11:00 PM - Sesi bersurai";

  const text = raw !== undefined && raw !== null && raw.trim() !== "" ? raw : defaultText;

  return text
    .split("\n")
    .map((line: string) => {
      const trimmed = line.trim();
      let time = "";
      let activity = "";

      if (trimmed.includes(" - ")) {
        const parts = trimmed.split(" - ");
        time = parts[0]?.trim() || "";
        activity = parts[1]?.trim() || "";
      } else if (trimmed.includes(" | ")) {
        const parts = trimmed.split(" | ");
        time = parts[0]?.trim() || "";
        activity = parts[1]?.trim() || "";
      } else {
        // Fallback split by first space after time pattern (e.g. "07:00 PM Ketibaan")
        const match = trimmed.match(/^(\d{2}:\d{2}\s*(?:AM|PM|WIB|WITA|WIT)?)\s+(.*)$/i);
        if (match) {
          time = match[1]?.trim() || "";
          activity = match[2]?.trim() || "";
        } else {
          time = "";
          activity = trimmed;
        }
      }
      return { time, activity };
    })
    .filter((item: AturCaraItem) => item.activity.length > 0);
});
</script>

<template>
  <div
    v-if="showSection"
    class="flex flex-col items-center px-8 py-10 text-center"
    id="aturCaraSection"
  >
    <div
      data-aos="zoom-in-up"
      data-aos-duration="1500"
      class="flex flex-col pt-16 pb-12 px-6 bg-container-shadow rounded-tema-jawa relative overflow-hidden w-full"
    >
      <!-- Gold Arch Decoration -->
      <div class="arch-line"></div>

      <!-- Section Title -->
      <p
        class="mb-8 mt-2 relative z-10 tracking-wide text-center"
        :style="{
          fontFamily: 'var(--font-section), \'Aston Script\', cursive',
          fontSize: 'calc(22px * var(--font-scale-section, 1))',
          lineHeight: '1.2',
          color: primaryColor
        }"
      >
        {{ sectionTitle }}
      </p>

      <!-- Items List -->
      <div class="space-y-1.5 relative z-10 text-left px-2 mx-auto w-full max-w-[320px]">
        <div
          v-for="(item, idx) in parsedItems"
          :key="idx"
          class="flex justify-between items-center border-b border-gray-300/40 py-2.5"
        >
          <span
            class="font-bold italic font-serif flex-shrink-0 mr-4"
            :style="{
              fontFamily: 'var(--font-italic), \'Times New Roman\', serif',
              fontSize: 'calc(15px * var(--font-scale-italic, 1))',
              color: timeColor
            }"
          >
            {{ item.time }}
          </span>
          <span
            class="font-bold italic font-serif text-right"
            :style="{
              fontFamily: 'var(--font-italic), \'Times New Roman\', serif',
              fontSize: 'calc(15px * var(--font-scale-italic, 1))',
              color: textColor
            }"
          >
            {{ item.activity }}
          </span>
        </div>
      </div>

      <!-- Ornamental Divider -->
      <div class="flex items-center justify-center space-x-2 mt-8 opacity-60 relative z-10">
        <div class="h-[1px] w-12 bg-[#d4af37]"></div>
        <div class="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></div>
        <div class="w-2.5 h-2.5 rotate-45 bg-[#d4af37]"></div>
        <div class="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></div>
        <div class="h-[1px] w-12 bg-[#d4af37]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background-image: var(--img-logo-mempelai, url("@/assets/images/logo-mempelai.png"));
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f5f3f1;
  width: 100%;
}

.arch-line {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1.5px solid #d4af37;
  border-top-left-radius: 340px;
  border-top-right-radius: 340px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  pointer-events: none;
  z-index: 5;
  opacity: 0.6;
}
</style>
