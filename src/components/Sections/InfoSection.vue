<script setup lang="ts">
import { computed, ref } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const selectedImage = ref<string | null>(null);

const openModal = (url: string) => {
  selectedImage.value = url;
};

const closeModal = () => {
  selectedImage.value = null;
};

const parsedOverride = computed(() => {
  const override = themeStore.wedding?.theme_override;
  if (!override) return {};
  if (typeof override === "string") {
    try {
      return JSON.parse(override);
    } catch (e) {
      return {};
    }
  }
  return override;
});

const infoTitle = computed(() => {
  return parsedOverride.value?.words?.info_title || "";
});

const infoItemsRaw = computed(() => {
  const raw = parsedOverride.value?.words?.info_items;
  return raw !== undefined && raw !== null
    ? raw
    : "- Tidak meninggalkan sholat wajib\n- Mendo'akan kedua mempelai\n- Memperhatikan adab makan dan minum\n- Berpakaian sopan serta menutup aurat";
});

interface ParsedInfoItem {
  id: string;
  isBullet: boolean;
  content: string;
  isImage: boolean;
  imageUrl: string;
  altText: string;
}

const parsedItems = computed<ParsedInfoItem[]>(() => {
  let lines: string[] = [];

  if (Array.isArray(infoItemsRaw.value)) {
    lines = infoItemsRaw.value.map((i) => String(i));
  } else if (typeof infoItemsRaw.value === "string") {
    lines = infoItemsRaw.value.split("\n");
  } else {
    lines = [String(infoItemsRaw.value)];
  }

  return lines
    .map((item, idx) => {
      const trimmed = item.trim();
      if (!trimmed) return null;

      const isBullet = trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•");
      let content = isBullet ? trimmed.replace(/^[-*•]\s*/, "").trim() : trimmed;

      let isImage = false;
      let imageUrl = "";
      let altText = "Informasi Custom";

      const htmlImgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
      const markdownImgMatch = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      const rawUrlMatch = content.match(/(https?:\/\/[^\s"'<>()]+|data:image\/[^\s"'<>()]+)/i);

      if (htmlImgMatch) {
        isImage = true;
        imageUrl = htmlImgMatch[1].trim();
      } else if (markdownImgMatch) {
        isImage = true;
        altText = markdownImgMatch[1] || "Informasi Custom";
        imageUrl = markdownImgMatch[2].trim();
      } else if (rawUrlMatch) {
        const urlCandidate = rawUrlMatch[1].trim();
        const lower = urlCandidate.toLowerCase();
        if (
          lower.includes("imagekit.io") ||
          lower.includes("r2.dev") ||
          lower.includes("cloudflarestorage.com") ||
          lower.includes("cloudinary.com") ||
          lower.includes("supabase.co") ||
          /\.(jpeg|jpg|png|webp|gif|svg|avif)(\?.*)?$/i.test(lower) ||
          lower.startsWith("http://") ||
          lower.startsWith("https://")
        ) {
          isImage = true;
          imageUrl = urlCandidate;
        }
      }

      return {
        id: `info-item-${idx}`,
        isBullet,
        content,
        isImage,
        imageUrl,
        altText,
      };
    })
    .filter((item): item is ParsedInfoItem => item !== null && item.content.length > 0);
});

const hasBullets = computed(() => {
  if (Array.isArray(infoItemsRaw.value)) {
    return true;
  }
  return parsedItems.value.some((item) => item.isBullet || item.isImage) || parsedItems.value.length > 1;
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
            v-if="!hasBullets && parsedItems.length === 1 && !parsedItems[0].isImage"
            class="text-gray-800 leading-relaxed italic text-center whitespace-pre-line"
            style="
              font-family: var(--font-italic), serif;
              font-size: calc(16px * var(--font-scale-italic, 1));
            "
          >
            {{ infoItemsRaw }}
          </p>
          <div v-else class="space-y-3">
            <div
              v-for="item in parsedItems"
              :key="item.id"
              class="text-gray-800 leading-relaxed italic flex flex-col items-center justify-center text-center w-full"
              style="
                font-family: var(--font-italic), serif;
                font-size: calc(16px * var(--font-scale-italic, 1));
              "
            >
              <!-- Render Image (ImageKit, R2, Standard URL, Markdown) -->
              <template v-if="item.isImage">
                <div class="my-1.5 w-full flex flex-col items-center group">
                  <div class="relative overflow-hidden rounded-lg shadow-sm border border-gray-200/60 bg-white/50 p-1 transition-transform transform active:scale-98">
                    <img
                      :src="item.imageUrl"
                      :alt="item.altText"
                      @click="openModal(item.imageUrl)"
                      class="max-w-full max-h-[300px] h-auto w-auto rounded-md mx-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div
                      @click="openModal(item.imageUrl)"
                      class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-md"
                    >
                      <span class="bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-xs font-sans not-italic">
                        🔍 Perbesar
                      </span>
                    </div>
                  </div>
                  <span
                    v-if="item.altText && item.altText !== 'Informasi Custom'"
                    class="text-xs text-gray-600 mt-1.5 font-sans not-italic"
                  >
                    {{ item.altText }}
                  </span>
                </div>
              </template>

              <!-- Render Text Point -->
              <template v-else>
                <div class="flex items-start justify-center text-center w-full">
                  <span v-if="item.isBullet" class="mr-2 text-[#6D735B] flex-shrink-0">•</span>
                  <span>{{ item.content }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedImage"
        @click="closeModal"
        class="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
      >
        <div
          class="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center justify-center p-2"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold bg-black/50 w-8 h-8 rounded-full flex items-center justify-center border border-white/20"
            aria-label="Tutup"
          >
            ✕
          </button>

          <!-- Expanded Image -->
          <img
            :src="selectedImage"
            class="max-w-full max-h-[80vh] w-auto h-auto rounded-lg shadow-2xl object-contain bg-white/5"
            alt="Zoomed Info Image"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>

