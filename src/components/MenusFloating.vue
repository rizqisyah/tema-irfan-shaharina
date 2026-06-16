<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted, computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const isPlay: Ref<boolean> = ref(false);
const usedAudio = computed(() => {
  return themeStore.wedding?.music_url || "https://qinvi-worker.kesone01.workers.dev/Music/Brian McKnight - Back At One (Lyrics) (mp3cut.net).mp3";
});
const emit = defineEmits<{
  (e: "fnClick", value: string): void;
}>();

onMounted(() => {
  changeStatePlay();
});

const audioPlayer = ref<HTMLAudioElement | null>(null);

const onAudioLoaded = (event: Event) => {
  const audio = event.target as HTMLAudioElement;
  audio.currentTime = 0; 
};

const changeStatePlay = (): void => {
  if (audioPlayer.value) {
    if (isPlay.value) {
      audioPlayer.value.pause();
    } else {
      audioPlayer.value.play();
    }
    // isPlay state will be updated by the @play/@pause event listeners on the audio element
    emit('fnClick', 'playMusic');
  }
};
</script>
<template>
  <div
    class="flex flex-row fixed bottom-2 bg-white menus-shadow z-50 justify-around py-2.5 rounded-full sm:right-1/3 sm:left-1/3 right-2 left-2"
  >
    <button
      class="flex flex-col items-center px-1"
      @click="() => emit('fnClick', 'welcomeSection')"
    >
      <img
        src="@/assets/icons/icon-home.png"
        width="18"
        height="15.5"
        class="pb-2"
      />
      <p class="caption-1 text-brown-10">Home</p>
    </button>
    <button
      class="flex flex-col items-center px-1"
      @click="() => emit('fnClick', 'mempelaiSection')"
    >
      <img
        src="@/assets/icons/icon-mempelai.png"
        width="18"
        height="18"
        class="pb-2"
      />
      <p class="caption-1 text-brown-10">Couple</p>
    </button>
    <button
      class="flex flex-col items-center px-1"
      @click="() => emit('fnClick', 'acaraSection')"
    >
      <img
        src="@/assets/icons/icon-calendar.png"
        width="18"
        height="18"
        class="pb-2"
      />
      <p class="caption-1 text-brown-10">Events</p>
    </button>
    <!-- <button
      class="flex flex-col items-center px-1"
      @click="() => emit('fnClick', 'walletSection')"
    >
      <img
        src="@/assets/icons/gift.png"
        width="18"
        height="18"
        class="pb-2"
      />
      <p class="caption-1 text-brown-10">Gift</p>
    </button> -->
    <audio
      ref="audioPlayer"
      :src="usedAudio"
      loop
      class="hidden"
      @loadedmetadata="onAudioLoaded"
      @play="isPlay = true"
      @pause="isPlay = false"
    ></audio>
    <button
      class="flex flex-col items-center px-1"
      @click="changeStatePlay"
      style="min-width: 42px"
    >
      <img
        v-if="isPlay"
        src="@/assets/icons/icon-pause.svg"
        width="18"
        height="18"
        class="pb-2"
      />
      <img
        v-else
        src="@/assets/icons/icon-play.svg"
        width="18"
        height="18"
        class="pb-2"
      />

      <p class="caption-1 text-brown-10">{{ isPlay ? "Pause" : "Play" }}</p>
    </button>
  </div>
</template>

<style scoped>
.menus-shadow {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05), 0px 2px 20px rgba(0, 0, 0, 0.05);
}
</style>
