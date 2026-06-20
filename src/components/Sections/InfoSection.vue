<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const infoTitle = computed(() => {
  return (
    themeStore.wedding?.theme_override?.words?.info_title ||
    "Adab Menghadiri Walimah"
  );
});

const parsedItems = computed(() => {
  const raw = themeStore.wedding?.theme_override?.words?.info_items;
  // Fallback to default Adab Walimah values if not configured
  const text =
    raw !== undefined
      ? raw
      : "- Tidak meninggalkan sholat wajib\n- Mendo'akan kedua mempelai\n- Memperhatikan adab makan dan minum\n- Berpakaian sopan serta menutup aurat";

  return text
    .split("\n")
    .map((item) => {
      const trimmed = item.trim();
      const isBullet = trimmed.startsWith("-");
      const content = isBullet ? trimmed.substring(1).trim() : trimmed;
      return { isBullet, content };
    })
    .filter((item) => item.content.length > 0);
});
</script>

<template>
  <div
    class="flex flex-col items-center px-8 py-10 text-center"
    id="infoSection"
  >
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="flex flex-col pt-16 pb-12 px-6 bg-container-shadow rounded-tema-jawa relative overflow-hidden w-full"
    >
      <!-- Gold Arch Decoration -->
      <div class="arch-line"></div>

      <p
        class="text-[#6D735B] mb-6 mt-2 relative z-10 tracking-wide text-center"
        style="
          font-family: var(--font-section);
          font-size: calc(16px * var(--font-scale-section, 1));
          line-height: 1.8;
        "
      >
        {{ infoTitle }}
      </p>

      <div class="space-y-4 relative z-10 text-left px-2 mx-auto max-w-[280px] w-full">
        <div
          v-for="(item, idx) in parsedItems"
          :key="idx"
          class="text-gray-800 leading-relaxed italic flex items-start"
          style="
            font-family: var(--font-italic), serif;
            font-size: calc(16px * var(--font-scale-italic, 1));
          "
        >
          <span v-if="item.isBullet" class="mr-2 text-[#6D735B] flex-shrink-0">•</span>
          <span>{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background-image: var(
    --img-logo-mempelai,
    url("@/assets/images/logo-mempelai.png")
  );
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
