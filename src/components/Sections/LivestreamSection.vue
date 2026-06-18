<script setup lang="ts">
// No props needed for now
</script>

<template>
  <div
    class="flex flex-col w-full text-center justify-center text-white py-6"
    id="livestreamSection"
  >
    <div class="flex flex-col items-center">
      <div
        class="flex flex-col items-center bg-white rounded-xl py-10 mx-8 bg-container-shadow w-[calc(100%-4rem)]"
      >
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="title-livestream text-black mb-4 font-bold"
          style="font-family: 'Wonderia'; font-size: 24px"
        >
          Live Streaming
        </p>

        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="caption-livestream text-black text-center mb-6 px-4"
          style="font-family: 'Cochin Italic'; font-size: 16px"
        >
          Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan momen bahagia
          kami secara virtual
        </p>

        <div
          data-aos="zoom-in-up"
          data-aos-duration="2500"
          class="video-container px-4 w-full"
        >
          <div
            class="relative pt-[56.25%] w-full overflow-hidden rounded-lg shadow-lg"
          >
            <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LKfg79ghTBs"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <a
          href="https://youtube.com/live/LKfg79ghTBs?feature=share"
          target="_blank"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="mt-6 bg-[#6D735B] px-6 py-2.5 rounded-full text-white flex items-center space-x-2 hover:bg-[#5a5f4a] transition-colors"
        >
          <span style="font-family: 'Wonderia'; font-size: 16px"
            >Buka di YouTube</span
          >
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background: rgba(245, 243, 241, 0.77);
  box-shadow: 0px 0px 45px 1px rgba(0, 0, 0, 0.5);
}

.video-container {
  max-width: 100%;
}
</style>
