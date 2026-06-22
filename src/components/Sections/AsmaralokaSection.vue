<script setup lang="ts">
import { defineProps } from "vue";

type AsmaralokaType = {
  id: string | number;
  wedding_id?: string;
  title: string;
  content: string;
  image_url?: string | null;
  sort_order?: number;
  created_at?: string;
};

type AsmaralokaPropsType = {
  asmaraloka?: Array<AsmaralokaType>;
};

const props = defineProps<AsmaralokaPropsType>();
</script>

<template>
  <div
    class="flex flex-col items-center px-8 py-10 text-center"
    id="asmaralokaSection"
  >
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="flex flex-col py-12 px-6 bg-container-shadow rounded-tema-jawa relative overflow-hidden"
    >
      <!-- Gold Arch Decoration -->
      <div class="arch-line"></div>

      <p
        class="text-[#6D735B] mb-8 relative z-10"
        style="font-family: var(--font-accent); font-size: calc(32px * var(--font-scale-accent, 1))"
      >
        Asmaraloka
      </p>

      <div class="space-y-6 relative z-10 text-center px-2">
        <template v-if="props.asmaraloka && props.asmaraloka.length > 0">
          <div
            v-for="(item, i) in props.asmaraloka"
            :key="item.id || i"
            class="space-y-2 mb-4"
          >
            <p
              v-if="item.title"
              class="text-[#6D735B] font-semibold"
              style="font-family: 'Cochin', serif; font-size: 18px"
            >
              {{ item.title }}
            </p>
            <p
              class="text-gray-800 leading-relaxed italic"
              style="font-family: 'Cochin Italic', serif; font-size: 16px"
            >
              {{ item.content }}
            </p>
          </div>
        </template>
        <template v-else>
          <p
            class="text-gray-800 leading-relaxed italic"
            style="font-family: 'Cochin Italic', serif; font-size: 16px"
          >
            Terlalu panjang jika diceritakan dari permulaan… Pada intinya kita
            hanya sepasang yang ditakdirkan berhasil melewati badai maupun pelangi
            sampai di titik ini.
          </p>

          <p
            class="text-gray-800 leading-relaxed italic"
            style="font-family: 'Cochin Italic', serif; font-size: 16px"
          >
            Ribuan tangis dan jutaan tawa menjadi saksi bagaimana kata "yakin"
            terus mengucap untuk mengokohkan hati yang kerdil.. Bukan hanya
            kata-kata yang tak menjelma aksi, segala pengorbanan telah menjadi
            reaksi.
          </p>

          <p
            class="text-gray-800 leading-relaxed italic"
            style="font-family: 'Cochin Italic', serif; font-size: 16px"
          >
            Hingga pada "6 Desember 2025", kita mempertemukan dua keluarga kami..
            Tidak semudah atau setenang yang terlihat… Sejatinya kita hanya
            berharap dan memasrahkan diri kepada Sang Maha Cinta, berdo’a agar
            senantiasa dimudahkan jalannya.
          </p>

          <p
            class="text-gray-800 leading-relaxed italic"
            style="font-family: 'Cochin Italic', serif; font-size: 16px"
          >
            Hingga terbitlah hari di mana kami akan mengikrarkan sebuah perjanjian
            yang kokoh kepada Tuhan SWT. "04 April 2026" akan menjadi awal dari
            hari-hari paling bahagia kami. Do’akan kami agar takdir senantiasa
            berlemah lembut kepada kisah kami nanti…
          </p>
        </template>

        <!-- Wedding Hashtag Image -->
        <div
          v-if="props.asmaraloka && props.asmaraloka.find(item => item.image_url)"
          class="mt-10 flex justify-center relative z-10"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          <img
            :src="props.asmaraloka.find(item => item.image_url)?.image_url!"
            alt="Wedding Hashtag"
            class="w-4/5 max-w-[300px]"
          />
        </div>
        <div
          v-else-if="!props.asmaraloka || props.asmaraloka.length === 0"
          class="mt-10 flex justify-center relative z-10"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          <img
            src="https://ik.imagekit.io/qinviVideo/3d/2026/Mar26/NamiraAzhar/IMG_6894.webp"
            alt="Wedding Hashtag"
            class="w-4/5 max-w-[300px]"
          />
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
