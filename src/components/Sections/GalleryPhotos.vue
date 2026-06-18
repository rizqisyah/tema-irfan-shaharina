<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import type { Ref } from "vue";

type GalleryPhotoPropsTypes = {
  gallery: string[];
  /**
   * Optional. Number of images that should appear per row.
   * Defaults to 2 so the behaviour stays the same as before.
   */
  perRow?: number;
};

const imgsRef: Ref<string[]> = ref([]);
const thumbnailRef: Ref<string[]> = ref([]);
const visibleRef: Ref<boolean> = ref(false);
const indexRef: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const props = defineProps<GalleryPhotoPropsTypes>();
// derived width for each item according to requested column count
const galleryMaxHeight = computed(() => {
  const perRow = props.perRow && props.perRow > 0 ? props.perRow : 2;
  if (!props.gallery || props.gallery.length === 0) {
    return "0vh";
  }
  // Calculate number of rows
  const rows = Math.ceil(props.gallery.length / perRow);
  // Assuming an average height of 40vh per row of images
  const height = rows * 40;
  return `${height}vh`;
});

const columns = ref<{ url: string; isLandscape: boolean }[][]>([]);
const featuredImages = ref<{ url: string; isLandscape: boolean }[]>([]);

const itemWidth = computed(() => {
  const perRow = props.perRow && props.perRow > 0 ? props.perRow : 2;
  return `${100 / perRow}%`;
});

const updateState = (
  items: { url: string; isLandscape: boolean }[],
  feat: { url: string; isLandscape: boolean }[]
) => {
  const perRow = props.perRow && props.perRow > 0 ? props.perRow : 2;
  const result: { url: string; isLandscape: boolean }[][] = Array.from(
    { length: perRow },
    () => []
  );
  items.forEach((item, index) => {
    result[index % perRow].push(item);
  });
  columns.value = result;
  featuredImages.value = feat;
};

const processGallery = async () => {
  if (!props.gallery || props.gallery.length === 0) {
    columns.value = [];
    featuredImages.value = [];
    return;
  }

  // Detect orientation for all photos
  const checks = props.gallery.map(async (url, idx) => {
    return new Promise<{ isLandscape: boolean; idx: number }>((resolve) => {
      const img = new Image();
      img.onload = () =>
        resolve({ isLandscape: img.naturalWidth > img.naturalHeight, idx });
      img.onerror = () => resolve({ isLandscape: false, idx });
      img.src = url;
    });
  });

  const results = await Promise.all(checks);

  // Separate portrait and landscape photos (preserve original order)
  const portraitPhotos: { url: string; isLandscape: boolean }[] = [];
  const landscapePhotos: { url: string; isLandscape: boolean }[] = [];

  results.forEach((r) => {
    const item = { url: props.gallery[r.idx], isLandscape: r.isLandscape };
    if (r.isLandscape) {
      landscapePhotos.push(item);
    } else {
      portraitPhotos.push(item);
    }
  });

  let gridItems = [...portraitPhotos];
  let fullWidthItems = [...landscapePhotos];

  // If portrait count is odd, move the last portrait to full-width display
  if (gridItems.length % 2 !== 0 && gridItems.length > 0) {
    fullWidthItems.unshift(gridItems.pop()!);
  }

  updateState(gridItems, fullWidthItems);
};

const thumbnailVerticalRef: Ref<string[]> = ref([]);
const thumbnailLandscapeRef: Ref<string[]> = ref([]);

const onShow = (index: number = 0): void => {
  visibleRef.value = true;
  indexRef.value = index;
};

const onHide = (): void => {
  visibleRef.value = false;
};

const handleAnimation = (i: number): string => {
  if (i % 2 == 0) return "fade-down";
  return "fade-right";
};

onMounted(() => {
  processGallery();
  // Existing logic for thumbnails if needed
  if (props.gallery.length > 0) {
    imgsRef.value = [...props.gallery];
    // ... existing thumbnail logic preserved implicitly or if needed
  }
});

watch(
  () => props.gallery,
  () => {
    processGallery();
    if (props.gallery.length > 0) {
      imgsRef.value = [...props.gallery];
    }
  }
);
</script>

<template>
  <div class="flex flex-col w-full text-center justify-center text-white py-6">
    <div class="flex flex-col items-center">
      <div
        class="flex flex-col items-center bg-white rounded-xl py-10 mx-8 bg-container-shadow"
      >
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="body-777 text-black mb-4"
        >
          Gallery
        </p>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="flex flex-col w-full px-2 mt-4 mb-6"
        ></div>
        <div class="flex flex-row mt-6">
          <div
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="flex flex-col px-2"
            :style="{ width: itemWidth }"
          >
            <img
              v-for="(item, imgIndex) in column"
              :key="imgIndex"
              data-aos-duration="2500"
              :src="item.url"
              @click="onShow(props.gallery.indexOf(item.url))"
              class="mb-4 rounded-lg w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>

        <div
          v-if="featuredImages.length > 0"
          class="flex flex-col px-2 w-full mt-4"
        >
          <img
            v-for="(item, fIdx) in featuredImages"
            :key="fIdx"
            data-aos-duration="2500"
            :src="item.url"
            @click="onShow(props.gallery.indexOf(item.url))"
            :class="[
              'w-full rounded-lg mb-4 object-cover',
              item.isLandscape ? 'aspect-video' : 'aspect-[4/5]',
            ]"
          />

          <div v-if="loading" class="flex flex-col items-center">
            <svg
              class="animate-spin mb-4 mt-6 h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <!-- <button
          class="button-date bg-linear-btn px-8 py-3 rounded-3xl flex flex-row justify-center items-center space-x-2.5 transition-all mt-4 mx-6"
          @click="onLoad()"
        >
          <p class="body-6 text-white">More Of Us</p>
        </button> -->
        </div>

        <!-- <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[8]"
          />
        </div> -->
        <div v-if="loading" class="flex flex-col items-center">
          <svg
            class="animate-spin mb-4 mt-6 h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <!-- <button
          class="button-date bg-linear-btn px-8 py-3 rounded-3xl flex flex-row justify-center items-center space-x-2.5 transition-all mt-4 mx-6"
          @click="onLoad()"
        >
          <p class="body-6 text-white">More Of Us</p>
        </button> -->
      </div>
    </div>
    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imgsRef"
      :index="indexRef"
      @hide="onHide"
    />
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background-color: color-mix(in srgb, var(--color-secondary) 77%, transparent);
  background-image: var(--img-logo-mempelai);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-shadow: 0px 0px 45px 1px rgba(0, 0, 0, 0.5);
}

.bg-linear-btn {
  background: linear-gradient(282.22deg, #000000 0%, #a98466 100%);
}
</style>
