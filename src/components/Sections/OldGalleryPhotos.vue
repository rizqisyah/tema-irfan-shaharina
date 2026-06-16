<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

type GalleryPhotoPropsTypes = {
  gallery: string[];
};

const imgsRef: Ref<string[]> = ref([]);
const thumbnailRef: Ref<string[]> = ref([]);
const visibleRef: Ref<boolean> = ref(false);
const indexRef: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const props = defineProps<GalleryPhotoPropsTypes>();
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

// const onLoad = (): void => {
//   const initial: number = thumbnailRef.value.length - 1;
//   loading.value = true;

//   setTimeout(() => {
//     loading.value = false;
//     thumbnailRef.value = [
//       ...thumbnailRef.value,
//       ...props.gallery.filter(
//         (e: string, i: number) => i > initial && i <= initial + 4
//       ),
//     ];
//   }, 1500);
// };

onMounted(() => {
  // if (props.gallery.length > 0) {
  //   imgsRef.value = [...props.gallery];
  //   thumbnailRef.value = [
  //     // ...props.gallery
  //     ...props.gallery.filter(
  //       (e: string, i: number) => ![1, 2, 3, 4, 5, 6, 7, 9, 10].includes(i)
  //     ),
  //   ];
  // }
  if (props.gallery.length > 0) {
    imgsRef.value = [...props.gallery];
    // let midIndex = Math.ceil(imgsRef.value.length / 2);

    // imgsRef.value.forEach((e: string, i: number) => {
    imgsRef.value.forEach((e: string) => {
      thumbnailLandscapeRef.value = [...thumbnailLandscapeRef.value, e];
      //   if (i <= midIndex) {
      //     thumbnailVerticalRef.value = [...thumbnailVerticalRef.value, e];
      //   } else {
      //     thumbnailLandscapeRef.value = [...thumbnailLandscapeRef.value, e];
      //   }
      // });
    });
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center bg-gallery">
      <div class="flex flex-col items-center bg-gallery-ov px-10 py-6">
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="headline-20 text-white my-8 font-extralight"
        >
          GALLERY
        </p>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="caption-9 text-white text-center mb-6"
        >
          A successful marriage requires falling in love many times, always with
          the same person
        </p>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[1]"
            @click="onShow(1 + 1)"
          />
        </div>
        <div class="grid grid-cols-2">
          <img
            :data-aos="handleAnimation(i)"
            data-aos-duration="2500"
            v-for="(e, i) in thumbnailRef"
            :key="i"
            @click="onShow(i + 1)"
            :src="e"
            class="p-1"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[2]"
            @click="onShow(2 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[3]"
            @click="onShow(3 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[5]"
            @click="onShow(5 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[6]"
            @click="onShow(6 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[7]"
            @click="onShow(7 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[9]"
            @click="onShow(9 + 1)"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[10]"
            @click="onShow(10 + 1)"
          />
        </div>
        <!-- <div class="grid grid-cols-1 gap-2 mb-1 mx-1">
          <img
            data-aos="fade-down p-1"
            data-aos-duration="2500"
            :src="imgsRef[4]"
            @click="onShow(4 + 1)"
          />
        </div> -->
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
.bg-gallery-ov {
  background: rgba(131, 96, 63, 0.9);
}
.bg-gallery {
  background-image: url("@/assets/images/bg-gallery.webp");
  background-size: cover;
}
.bg-linear-btn {
  background: linear-gradient(282.22deg, #000000 0%, #a98466 100%);
}
</style>
