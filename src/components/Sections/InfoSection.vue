<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const infoTitle = computed(() => {
  return themeStore.wedding?.theme_override?.words?.info_title || "";
});

const infoItemsText = computed(() => {
  const raw = themeStore.wedding?.theme_override?.words?.info_items;
  return raw !== undefined
    ? raw
    : "- Tidak meninggalkan sholat wajib\n- Mendo'akan kedua mempelai\n- Memperhatikan adab makan dan minum\n- Berpakaian sopan serta menutup aurat";
});

const hasBullets = computed(() => {
  return infoItemsText.value.split("\n").some((line) => line.trim().startsWith("-"));
});

const parsedItems = computed(() => {
  return infoItemsText.value
    .split("\n")
    .map((item) => {
      const trimmed = item.trim();
      const isBullet = trimmed.startsWith("-");
      const content = isBullet ? trimmed.substring(1).trim() : trimmed;
      const isImage = content.startsWith("http://") || content.startsWith("https://");
      return { isBullet, content, isImage };
    })
    .filter((item) => item.content.length > 0);
});
</script>

<template>
  <div class="flex flex-col relative" id="infoSection">
    <div class="flex flex-col px-4 py-6">
      <div
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="flex flex-col bg-container-shadow rounded-xl py-8 px-6 text-center items-center w-full"
      >
        <p
          v-if="infoTitle"
          class="body-777 mb-4 relative z-10 text-center"
        >
          {{ infoTitle }}
        </p>

        <div class="relative z-10 text-center px-2 mx-auto max-w-[340px] w-full">
          <p
            v-if="!hasBullets"
            class="text-gray-800 leading-relaxed italic text-center whitespace-pre-line"
            style="
              font-family: var(--font-italic), serif;
              font-size: calc(16px * var(--font-scale-italic, 1));
            "
          >
            {{ infoItemsText }}
          </p>
          <div v-else class="space-y-3">
            <div
              v-for="(item, idx) in parsedItems"
              :key="idx"
              class="text-gray-800 leading-relaxed italic flex items-center justify-center text-center w-full"
              style="
                font-family: var(--font-italic), serif;
                font-size: calc(16px * var(--font-scale-italic, 1));
              "
            >
              <template v-if="item.isImage">
                <img
                  :src="item.content"
                  class="max-w-full h-auto my-1 rounded-md mx-auto"
                  alt="info image"
                />
              </template>
              <template v-else>
                <span v-if="item.isBullet" class="mr-2 text-[#6D735B] flex-shrink-0">•</span>
                <span>{{ item.content }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
