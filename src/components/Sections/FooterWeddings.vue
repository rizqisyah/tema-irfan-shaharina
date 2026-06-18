<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const logoUrl = computed(() => {
  const override = themeStore.wedding?.theme_override?.images?.logo_mempelai;
  return (
    override ||
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/IMG_9692.webp?updatedAt=1781262749703"
  );
});

const isImageHashtag = computed(() => {
  const raw = themeStore.wedding?.theme_override?.words?.hashtag;
  if (!raw) return false;
  const val = raw.trim();
  return (
    val.includes("imagekit.io") ||
    /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg)/i.test(val)
  );
});

const hashtag = computed(() => {
  const raw = themeStore.wedding?.theme_override?.words?.hashtag;
  if (!raw || raw.trim() === "") return "";

  if (isImageHashtag.value) {
    return raw.trim();
  }

  const val = raw.trim();
  return val.startsWith("#") ? val : `#${val}`;
});

const handleIg = (): void => {
  window.open("https://instagram.com/25ribuaja");
};
const handleWa = (): void => {
  window.open("https://wa.me/+62895602352228");
};
</script>
<template>
  <div class="flex flex-col items-center justify-center px-10 relative pb-10">
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="flex flex-col bg-container-shadow rounded-xl body-3 text-black font-medium mb-16 mt-6 p-6 text-center items-center relative z-10"
    >
      <img
        data-aos="fade-up"
        data-aos-duration="2500"
        width="100"
        height="100"
        :src="logoUrl"
        alt="Qinvi Wedding Icon"
        class="mb-6"
      />
      <p>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
        kedua mempelai. Terima kasih atas doa restu dan dukungannya.
      </p>
      <div v-if="hashtag" class="mt-4 w-full flex justify-center">
        <img
          v-if="isImageHashtag"
          :src="hashtag"
          alt="Hashtag"
          class="max-w-[80%] max-h-16 object-contain"
        />
        <p
          v-else
          class="font-bold tracking-widest"
          :style="{
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-accent)',
            fontSize: 'calc(24px * var(--font-scale-accent, 1))',
          }"
        >
          {{ hashtag }}
        </p>
      </div>
    </div>
    <div class="flex flex-row space-x-2 mb-8 mt-6">
      <img src="../../assets/icons/icon-ig.png" @click="handleIg" width="32" />
      <img src="../../assets/icons/icon-wa.png" width="32" @click="handleWa" />
    </div>
  </div>
</template>

<style scoped>
.caption-local {
  font-family: "TAN - PEARL";
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.bg-quotes {
  background-image: url("@/assets/images/bg-ayat.webp");
  background-size: cover;
  background-position: center;
}

.bg-quotes-linear {
  background: rgba(234, 224, 212, 0.9);
  box-shadow: 0px 0px 45px 1px rgba(0, 0, 0, 0.5);
}
</style>
