<script setup lang="ts">
import { defineProps, computed } from "vue";

type ceritaCintaTypes = {
  id: string | number;
  wedding_id?: string;
  title?: string;
  description?: string;
  event_date?: string;
  sort_order?: number;
  created_at?: string;
  createdDate?: string;
  isiCerita?: string;
  judul?: string;
  tanggal?: string;
  updatedDate?: string;
  userId?: number;
  pathImg?: string;
};

type ceritaCintaPropsType = {
  ceritaCinta: Array<ceritaCintaTypes>;
};
const props = defineProps<ceritaCintaPropsType>();

const dateFilter = computed(() => {
  return (params: string) => {
    return new Date(params).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
});
</script>

<template>
  <div
    class="flex flex-col items-center px-8 py-10 text-center"
    id="storySection"
  >
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="flex flex-col py-12 px-6 bg-container-shadow rounded-tema-jawa relative overflow-hidden"
    >
      <!-- Gold Arch Decoration -->
      <div class="arch-line"></div>

      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="text-[#6D735B] mb-8 relative z-10"
        style="font-family: var(--font-accent); font-size: calc(32px * var(--font-scale-accent, 1))"
      >
        Kisah Cinta
      </p>
      <div class="container relative z-10">
        <div class="flex flex-col md:grid grid-cols-12 text-black text-left">
          <div
            v-for="(e, i) in props.ceritaCinta"
            class="flex md:contents"
            :key="i"
          >
            <div class="col-start-2 col-end-4 mr-6 md:mx-auto relative">
              <div
                class="w-4 flex items-center justify-center"
                :class="{ 'h-full': i !== props.ceritaCinta.length - 1 }"
              >
                <div
                  class="h-full w-0.5 bg-[#6D735B] opacity-30 pointer-events-none"
                ></div>
              </div>
              <div
                class="w-4 h-4 absolute top-1 -mt-3 rounded-full bg-[#6D735B] shadow text-center flex items-center justify-center"
              >
                <i class="fas fa-heart text-white" style="font-size: 8px"></i>
              </div>
            </div>
            <div class="col-start-4 col-end-12 rounded-xl mb-6 mr-auto w-full">
              <p
                v-if="e.event_date || e.tanggal"
                class="text-xs text-[#6D735B] font-semibold opacity-75 mb-0.5"
                style="font-family: 'Cochin', serif"
              >
                {{ dateFilter(e.event_date || e.tanggal || "") }}
              </p>
              <p
                class="text-[#6D735B] font-bold mb-1"
                style="font-family: 'Cochin', serif; font-size: 18px"
              >
                {{ e.title || e.judul }}
              </p>
              <p
                class="text-gray-700 leading-relaxed"
                style="font-family: 'Cochin', serif; font-size: 15px"
              >
                {{ e.description || e.isiCerita }}
              </p>
            </div>
          </div>
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
