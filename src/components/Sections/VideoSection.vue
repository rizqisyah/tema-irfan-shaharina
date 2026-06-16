<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const videoUrl = computed(() => {
  return themeStore.wedding?.video_url || "https://qinvi-worker.kesone01.workers.dev/2026/juni26/ci.mp4";
});
</script>

<template>
  <div
    class="items-center justify-center w-full h-screen overflow-hidden relative"
  >
    <video
      id="videoSection"
      :src="videoUrl"
      loop
      muted
      controls
      autoplay
      playsinline
      webkit-playsinline
      class="absolute top-0 left-0 w-full h-full object-cover"
    >
    </video>
  </div>
</template>


<!-- <script>
export default {
  data() {
    return {
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
      showPlayButton: true
    }
  },
  computed: {
    youtubeEmbedUrl() {
      const videoId = 'vU9oDcyZ0RI';
      // For iOS, we need to start with the video muted
      return this.isIOS 
        ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1&playsinline=1`
        : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1`;
    }
  },
  methods: {
    handleIframeLoad() {
      // Hide play button after a short delay if not iOS
      if (!this.isIOS) {
        setTimeout(() => {
          this.showPlayButton = false;
        }, 2000);
      }
    },
    playVideo() {
      this.showPlayButton = false;
      // For iOS, we need to handle play through a user gesture
      if (this.isIOS && this.$refs.youtubeIframe) {
        const iframe = this.$refs.youtubeIframe;
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }
    }
  }
};
</script> -->
