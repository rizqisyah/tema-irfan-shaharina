<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

type pengantinTypes = {
  createdAt: string;
  gender: string;
  id: number;
  namaAyah: string;
  namaIbu: string;
  namaLengkap: string;
  namaPanggilan: string;
  updatedAt: string;
  urlPath: string;
  userId: string;
  childOf?: string;
};

type introductionFamiliesType = {
  pengantin: Array<pengantinTypes>;
  tamu: {
    createdAt: string;
    domainUndangan: string;
    id: number;
    namaTamu: string;
    noHandphone: string;
    secureId: string;
    statusUndangan: number;
    tglKirimUndangan: string;
    updatedAt: string;
    userId: number;
  };
};

const props = defineProps<introductionFamiliesType>();

const emptyPengantin: pengantinTypes = {
  createdAt: "-",
  gender: "-",
  id: 0,
  namaAyah: "-",
  namaIbu: "-",
  namaLengkap: "-",
  namaPanggilan: "-",
  updatedAt: "-",
  urlPath: "-",
  userId: "-",
  childOf: "",
};

const pengantinPria = computed(
  () =>
    props.pengantin.find((e) => e.gender?.toUpperCase() === "M") ??
    emptyPengantin
);

const pengantinWanita = computed(
  () =>
    props.pengantin.find((e) => e.gender?.toUpperCase() === "F") ??
    emptyPengantin
);

const isNotEmpty = (val: string | null | undefined): boolean => {
  if (!val) return false;
  const trimmed = val.trim();
  return trimmed !== "" && trimmed !== "-";
};

const hasFatherPria = computed(() => isNotEmpty(pengantinPria.value.namaAyah));
const hasMotherPria = computed(() => isNotEmpty(pengantinPria.value.namaIbu));
const hasParentsPria = computed(
  () => hasFatherPria.value || hasMotherPria.value
);

const hasFatherWanita = computed(() =>
  isNotEmpty(pengantinWanita.value.namaAyah)
);
const hasMotherWanita = computed(() =>
  isNotEmpty(pengantinWanita.value.namaIbu)
);
const hasParentsWanita = computed(
  () => hasFatherWanita.value || hasMotherWanita.value
);

const groomOrder = computed(() => {
  const groomFirst = themeStore.wedding?.order_groom_first !== false;
  return groomFirst ? 1 : 3;
});

const brideOrder = computed(() => {
  const groomFirst = themeStore.wedding?.order_groom_first !== false;
  return groomFirst ? 3 : 1;
});

const logoUrl = computed(() => {
  const override = themeStore.wedding?.theme_override?.images?.logo_mempelai;
  return (
    override ||
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/IMG_9692.webp?updatedAt=1781262749703"
  );
});

const quoteText = computed(() => {
  return (
    themeStore.wedding?.theme_override?.words?.quote_text ||
    "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan."
  );
});

const quoteVerse = computed(() => {
  return (
    themeStore.wedding?.theme_override?.words?.quote_verse || "Kolose 3:14"
  );
});

const handleIgP = (): void => {
  window.open("https://www.instagram.com/razhar_");
};
const handleIgW = (): void => {
  window.open("https://www.instagram.com/namirazzhr_");
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center p-8 bg-quotes relative">
      <div
        data-aos="zoom-in-up"
        data-aos-duration="1000"
        class="flex flex-col bg-container-shadow items-center rounded-tema-jawa pt-12 px-3 text-justify relative overflow-hidden"
      >
        <!-- Gold Arch Decoration -->
        <div class="arch-line"></div>

        <div class="z-10 flex flex-col items-center">
          <img
            data-aos="zoom-in-up"
            data-aos-duration="2000"
            width="100"
            height="100"
            :src="logoUrl"
            alt="Qinvi Wedding Icon"
            class="mb-4 mt-6"
          />
        </div>

        <!-- Ornamental divider -->
        <img
          data-aos="fade-in"
          data-aos-duration="1500"
          src="/src/assets/images/garis-batas.png"
          alt="ornament divider"
          class="w-4/5 my-3"
        />
        <!-- Translation -->
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="caption-8 text-black text-center px-2"
        >
          “{{ quoteText }}”
          <span class="block mt-5 font-bold">{{ quoteVerse }}</span>
        </p>

        <!-- Bottom ornamental divider -->
        <img
          data-aos="fade-in"
          data-aos-duration="1500"
          src="/src/assets/images/garis-batas.png"
          alt="ornament divider"
          class="w-4/5 my-3"
        />
      </div>
    </div>
    <div
      class="flex flex-col pt-7 pb-9 bg-events relative"
      :style="
        themeStore.bgSpouse ? {
          background: themeStore.bgSpouse,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        } : {}
      "
    >
      <div
        data-aos="zoom-in-up"
        data-aos-duration="1000"
        class="flex flex-col pt-20 pb-32 relative z-10"
      >
        <div
          data-aos="zoom-in-up"
          data-aos-duration="2500"
          class="flex flex-col items-center mb-10"
        >
          <p class="body-777 mb-5 px-8 text-center">
            {{ themeStore.isEnglish ? 'The Bride & Groom' : 'Kedua Mempelai' }}
          </p>

          <!-- Groom Section -->
          <div
            data-aos="zoom-in-up"
            data-aos-duration="2500"
            class="flex flex-col items-center mb-14 w-full"
            :style="{ order: groomOrder }"
          >
            <div class="relative w-full">
              <div class="orn-couple-edge left">
                <img
                  src="/src/assets/images/IMG_6477.png"
                  class="w-full flower-animate"
                />
              </div>
              <div class="orn-couple-edge right">
                <img
                  src="/src/assets/images/IMG_6477.png"
                  class="w-full flower-animate"
                />
              </div>
              <div class="w-full relative z-10 block">
                <img
                  :src="pengantinPria.urlPath"
                  alt="Qinvi Wedding Photos Groom"
                  class="mb-6 w-full !max-w-none block object-cover scale-[1.02]"
                  style="
                    width: 100%;
                    transform: scale(1.02);
                    transform-origin: center;
                  "
                />
              </div>
            </div>
            <p
              class="headline-11 mt-2 mb-1 px-8 text-center"
              style="font-family: var(--font-spouse_nickname, var(--font-spouse-nickname, var(--font-headline, var(--font-script)))); font-size: calc(2rem * var(--font-scale-spouse_nickname, var(--font-scale-spouse-nickname, var(--font-scale-headline, var(--font-scale-script, 1)))))"
            >
              {{ pengantinPria.namaPanggilan }}
            </p>
            <p
              class="caption-11 mb-8 px-8 text-center font-bold"
              style="font-family: var(--font-spouse_fullname, var(--font-spouse-fullname, var(--font-italic))); font-size: calc(20.8px * var(--font-scale-spouse_fullname, var(--font-scale-spouse-fullname, var(--font-scale-italic, 1))))"
            >
              {{ pengantinPria.namaLengkap }}
            </p>

            <div v-if="hasParentsPria" class="relative w-full">
              <div class="flex flex-col items-center w-full relative z-10">
                <p
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center mb-1"
                >
                  {{
                    isNotEmpty(pengantinPria.childOf)
                      ? pengantinPria.childOf
                      : "Putra dari"
                  }}
                </p>
                <p
                  v-if="hasFatherPria"
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center"
                >
                  {{ pengantinPria.namaAyah }}
                </p>
                <p
                  v-if="hasMotherPria"
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center"
                >
                  {{ pengantinPria.namaIbu }}
                </p>
              </div>
            </div>
          </div>

          <!-- Separator -->
          <div class="flex flex-col items-center w-full px-8" style="order: 2">
            <img
              src="/src/assets/images/IMG_8479.png"
              alt="Qinvi Wedding Separator"
              class="mb-6 w-full"
            />
          </div>

          <!-- Bride Section -->
          <div
            data-aos="zoom-in-up"
            data-aos-duration="2500"
            class="flex flex-col items-center mb-14 w-full"
            :style="{ order: brideOrder }"
          >
            <div class="relative w-full">
              <div class="orn-couple-edge left">
                <img
                  src="/src/assets/images/IMG_6477.png"
                  class="w-full flower-animate"
                />
              </div>
              <div class="orn-couple-edge right">
                <img
                  src="/src/assets/images/IMG_6477.png"
                  class="w-full flower-animate"
                />
              </div>
              <div class="w-full relative z-10 block">
                <img
                  :src="pengantinWanita.urlPath"
                  alt="Qinvi Wedding Photos Bride"
                  class="mb-6 w-full !max-w-none block object-cover scale-[1.02]"
                  style="
                    width: 100%;
                    transform: scale(1.02);
                    transform-origin: center;
                  "
                />
              </div>
            </div>
            <p
              class="headline-11 mt-2 mb-1 px-8 text-center"
              style="font-family: var(--font-spouse_nickname, var(--font-spouse-nickname, var(--font-headline, var(--font-script)))); font-size: calc(2rem * var(--font-scale-spouse_nickname, var(--font-scale-spouse-nickname, var(--font-scale-headline, var(--font-scale-script, 1)))))"
            >
              {{ pengantinWanita.namaPanggilan }}
            </p>
            <p
              class="caption-11 mb-8 px-8 text-center font-bold"
              style="font-family: var(--font-spouse_fullname, var(--font-spouse-fullname, var(--font-italic))); font-size: calc(20.8px * var(--font-scale-spouse_fullname, var(--font-scale-spouse-fullname, var(--font-scale-italic, 1))))"
            >
              {{ pengantinWanita.namaLengkap }}
            </p>
            <!-- Nama Lengkap Mempelai Wanita -->

            <div v-if="hasParentsWanita" class="relative w-full">
              <div class="flex flex-col items-center w-full relative z-10">
                <p
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center mb-1"
                >
                  {{
                    isNotEmpty(pengantinWanita.childOf)
                      ? pengantinWanita.childOf
                      : "Putri dari"
                  }}
                </p>
                <p
                  v-if="hasFatherWanita"
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center"
                >
                  {{ pengantinWanita.namaAyah }}
                </p>
                <p
                  v-if="hasMotherWanita"
                  data-aos="zoom-in-up"
                  data-aos-duration="2000"
                  class="caption-10 px-8 text-center"
                >
                  {{ pengantinWanita.namaIbu }}
                </p>
              </div>
            </div>
          </div>

          <!-- Closing Quote -->
          <!-- <div class="mt-4 mb-10 flex flex-col items-center w-full">
          <p data-aos="zoom-in-up" data-aos-duration="2000" class="caption-8 text-black text-center px-4" style="line-height: 1.5;">
            "May every step forward always be embraced by the gentleness of destiny, strengthened by the love of the Most Loving, and blessed with eternal happiness, Amen."
          </p>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-quotes {
  /* background-image: url("https://ik.imagekit.io/qinviVideo/3d/2026/Feb26/ClaudyaYosef/Background.webp"); */
  background-position: center;
  background-repeat: no-repeat;
  min-height: 70vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-attachment: fixed;
}
.bg-events {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-attachment: fixed;
  color: var(--color-spouse-text, var(--color-text-dark, #1F1C1F));
}
/* Fix for iOS devices */
@supports (-webkit-touch-callout: none) {
  .bg-quotes,
  .bg-events {
    background-attachment: scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
}

.bg-quotes-linear {
  background: #d1dcd8;
  box-shadow: 0px 0px 45px 1px rgba(0, 0, 0, 0.5);
}

.flower-animate {
  transform-origin: 10% 100%;
  animation: goyang 6s ease-in-out infinite alternate;
}

.orn-couple-edge {
  position: absolute;
  width: 40%;
  max-width: 460px;
  top: -10%;
  z-index: 0;
}

.orn-couple-edge-bot {
  position: absolute;
  width: 60%;
  max-width: 400px;
  top: -190%;
  z-index: 0;
}

.orn-couple-edge-botw {
  position: absolute;
  width: 60%;
  max-width: 400px;
  top: -190%;
  z-index: 0;
}
.orn-couple-edge.right {
  right: 0%;
  transform: translate(55%, 0%) rotate(12deg) scaleX(-1);
}

.orn-couple-edge-bot.left {
  left: 0%;
  transform: translate(-55%, 0%) rotate(-12deg);
}

.orn-couple-edge-bot.right {
  right: 0%;
  transform: translate(55%, 0%) rotate(12deg) scaleX(-1);
}

.orn-couple-edge.left {
  left: 0%;
  transform: translate(-55%, 0%) rotate(-12deg);
}

.orn-couple-bottom {
  position: absolute;
  width: 60%;
  max-width: 280px;
  bottom: -5%;
  z-index: 20;
  pointer-events: none;
}

.orn-couple-bottom.left {
  left: -20%;
}

.orn-couple-bottom.right {
  right: -20%;
  transform: scaleX(-1);
}

.scale-x-\[-1\] {
  transform: scaleX(-1);
}

@keyframes goyang {
  0% {
    transform: rotate(-6deg);
  }
  100% {
    transform: rotate(4deg);
  }
}

.arch-line {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1.5px solid var(--color-accent, #d4af37);
  border-top-left-radius: 340px;
  border-top-right-radius: 340px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  pointer-events: none;
  z-index: 5;
  opacity: 0.6;
}
</style>
