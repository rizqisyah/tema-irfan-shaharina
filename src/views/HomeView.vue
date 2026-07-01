<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import type { Ref } from "vue";

import WelcomeSection from "@/components/Sections/WelcomeSection.vue";
import StorySection from "@/components/Sections/StorySections.vue";
import AsmaralokaSection from "@/components/Sections/AsmaralokaSection.vue";
import IntroductionFamilies from "@/components/Sections/IntroductionFamilies.vue";
import WeddingEvents from "@/components/Sections/WeddingEvents.vue";
import PresenceForm from "@/components/Sections/PresenceForm.vue";
import ElectronicWallet from "@/components/Sections/ElectronicWallet.vue";
import GalleryPhotos from "@/components/Sections/GalleryPhotos.vue";
import PrayerWishes from "@/components/Sections/PrayerWishes.vue";
import FooterWeddings from "@/components/Sections/FooterWeddings.vue";
import MenusFloating from "@/components/MenusFloating.vue";
import WishesList from "@/components/Sections/WishesList.vue";
import VideoSection from "@/components/Sections/VideoSection.vue";
import InfoSection from "@/components/Sections/InfoSection.vue";
import AturCaraSection from "@/components/Sections/AturCaraSection.vue";
import ContactPersonSection from "@/components/Sections/ContactPersonSection.vue";
import { useRoute } from "vue-router";
import { useSnackbar } from "vue3-snackbar";
import { useHead } from "@vueuse/head";
import HomeService from "@/services/resources/home.service";
import { useThemeStore } from "@/stores/theme";
const themeStore = useThemeStore();
const groomFirst = computed(() => {
  return themeStore.wedding?.order_groom_first !== false;
});
const isOpen: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const isRestricted: Ref<boolean> = ref(false);
const mempelaiPria: Ref<string> = ref("-");
const mempelaiWanita: Ref<string> = ref("-");
const fotoFooter: Ref<string> = ref("-");

const weddingData: Ref<any> = ref(null);
const rawGuest: Ref<any> = ref(null);

const countdownDate = computed(() => {
  if (weddingData.value?.countdown_date)
    return weddingData.value.countdown_date;
  const acara = dataPernikahan.value?.acara;
  if (acara && acara.length > 0) return acara[0].event_date || acara[0].tanggal;
  return null;
});

const route = useRoute();
const snackbar = useSnackbar();
const visibleRef: Ref<boolean> = ref(false);
const indexRef: Ref<number> = ref(0);
const onShow = (index: number = 0): void => {
  visibleRef.value = true;
  indexRef.value = index;
};
const invitedPerson = computed(() => {
  return (
    dataPernikahan.value.tamu?.namaTamu || (route.query?.to as string | null)
  );
});
const isInvited = computed(() => {
  return invitedPerson.value !== null;
});
const isVideoSectionShown: Ref<boolean> = ref(false);
interface dataPernikahanType {
  // homeView: {
  //   background: "/image.webp",
  //   type: "image"
  // };
  // welcomeSection: {
  //   background: "/image.webp",
  //   type: "image"
  // },
  // galleryPhotos: {
  //   background: "#768C6E",
  //   type: "color"
  // },
  // IntroductionFamilies: {
  //   background: "/image.webp",
  //   type: "image"
  // },
  // weddingEvents: {
  //   background: "/image.webp",
  //   type: "image"
  // },
  // presenceForm: {
  //   background: "#768C6E",
  //   type: "color"
  // },
  // prayerWishes: {
  //   background: "#FAFFD8",
  //   type: "color"
  // }
  // wishesList: {
  //   background: "#FAFFD8",
  //   type: "color"
  // },
  // electronicWallet: {
  //   background: "#768C6E",
  //   type: "color"
  // },
  // footerWeddings: {
  //   background: "/images/bg-thanks.webp",
  //   type: "image"
  // }
  acara: Array<{
    id: string | number;
    wedding_id?: string;
    title?: string;
    event_date?: string;
    location_name?: string;
    address?: string;
    maps_url?: string;
    sort_order?: number;
    created_at?: string;
    event_time?: string;
    google_calendar_url?: string;
    alamat?: string;
    createdAt?: string;
    lokasi?: string;
    namaAcara?: string;
    tanggal?: string;
    updatedAt?: string;
    urlMap?: string;
    userId?: number;
    waktuMulai?: string;
    waktuSelesai?: string;
    ingatkanAcara?: string;
  }>;
  ceritaCinta: Array<{
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
  }>;
  gallery: string[];
  pengantin: Array<{
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
  }>;
  rekening: Array<{
    createdAt: string;
    id: number;
    namaBank: string;
    namaPemilik: string;
    noRekening: string;
    updatedAt: string;
    userId: number;
  }>;
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
    has_rsvp?: boolean;
  };
  ucapan: Array<{
    id?: string | number;
    guest_name?: string;
    message?: string;
    created_at?: string;
    nama?: string;
    ucapan?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
  }>;
  asmaraloka: Array<{
    id: string | number;
    wedding_id?: string;
    title?: string;
    content?: string;
    image_url?: string | null;
    sort_order?: number;
    created_at?: string;
  }>;
}

const dataPernikahan: Ref<dataPernikahanType> = ref({
  acara: [],
  ceritaCinta: [],
  gallery: [],
  pengantin: [],
  rekening: [],
  tamu: {
    createdAt: "",
    domainUndangan: "",
    id: 0,
    namaTamu: "",
    noHandphone: "",
    secureId: "",
    statusUndangan: 0,
    tglKirimUndangan: "",
    updatedAt: "",
    userId: 0,
  },
  ucapan: [],
  asmaraloka: [],
});

const fetchHomeData = () => {
  const slug: string = route.params?.username as string;
  const guestCode: string | undefined = route.query?.to as string | undefined;

  return HomeService.getHome(slug, guestCode)
    .then((result) => {
      const { data, status } = result;
      if (status == 200) {
        const apiData = data.data;
        const { wedding, theme, guest, content } = apiData;

        themeStore.setWedding(wedding);
        themeStore.setTheme(theme);
        themeStore.applyTheme();

        weddingData.value = wedding;
        rawGuest.value = guest;

        const mappedGallery = (content?.gallery || [])
          .map((item: any) => {
            return typeof item === "string" ? item : item.image_url || "";
          })
          .filter(Boolean);

        if (mappedGallery.length > 0) {
          fotoFooter.value = mappedGallery[mappedGallery.length - 1];
        }

        const mappedGuest = guest
          ? {
              createdAt: guest.created_at || "",
              domainUndangan: "",
              id: 0,
              namaTamu:
                guest.guest_name ||
                (typeof guest?.query?.to === "string" ? guest.query.to : ""),
              noHandphone: guest.phone || "",
              secureId: guest.guest_code || "",
              statusUndangan: 0,
              tglKirimUndangan: "",
              updatedAt: "",
              userId: 0,
              has_rsvp: guest.has_rsvp || false,
            }
          : dataPernikahan.value.tamu;

        const mappedPengantin = (content?.pengantin || []).map((p: any) => ({
          createdAt: p.created_at || "",
          gender:
            p.type === "groom"
              ? "M"
              : p.type === "bride"
              ? "F"
              : p.gender || "-",
          id: p.id || 0,
          namaAyah: p.father_name || "-",
          namaIbu: p.mother_name || "-",
          namaLengkap: p.name || "-",
          namaPanggilan: p.nickname || p.name || "-",
          updatedAt: p.updated_at || "",
          urlPath: p.photo_url || "",
          userId: p.wedding_id || "",
          childOf: p.child_of || "",
        }));

        const pria = mappedPengantin.find((p: any) => p.gender === "M");
        const wanita = mappedPengantin.find((p: any) => p.gender === "F");
        if (pria && pria.namaPanggilan && pria.namaPanggilan !== "-") {
          mempelaiPria.value = pria.namaPanggilan;
        }
        if (wanita && wanita.namaPanggilan && wanita.namaPanggilan !== "-") {
          mempelaiWanita.value = wanita.namaPanggilan;
        }

        dataPernikahan.value = {
          acara: content?.acara || [],
          ceritaCinta: content?.ceritaCinta || [],
          gallery: mappedGallery,
          pengantin: mappedPengantin,
          rekening: content?.rekening || [],
          tamu: mappedGuest,
          ucapan: content?.ucapan || [],
          asmaraloka: content?.asmaraloka || [],
        };

        return true;
      } else {
        console.error(data?.data?.message);
        snackbar.add({
          type: "error",
          title: "Error",
          text: "Failed to load data!",
          group: "5862a88b",
          count: 1,
        });
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 403) {
        isRestricted.value = true;
      }
      return false;
    });
};

let initialFetchPromise: Promise<boolean> | null = null;

const handleClick = (): void => {
  if (weddingData.value) {
    isOpen.value = true;
    return;
  }

  loading.value = true;
  const promise = initialFetchPromise || fetchHomeData();
  promise
    .then((success) => {
      if (success) {
        isOpen.value = true;
      } else {
        initialFetchPromise = null;
      }
    })
    .catch(() => {
      initialFetchPromise = null;
    })
    .finally(() => (loading.value = false));
};

const capitalize = (text: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const splittingUsername = (username: string): string => {
  const result = username.split("-");
  mempelaiPria.value = capitalize(result[0]);
  mempelaiWanita.value = capitalize(result[1]);

  return `The Wedding  Of  ${mempelaiPria.value} and ${mempelaiWanita.value}`;
};

const handleMenuClick = (e: string): void => {
  const $element = document.getElementById(e);
  if ($element) {
    $element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }
};

onMounted(() => {
  const username: string | null = route.params?.username as string;
  splittingUsername(username);
  isVideoSectionShown.value = true;

  initialFetchPromise = fetchHomeData();
});

const headData = reactive({
  title: splittingUsername(route.params?.username as string),
  meta: [
    {
      name: "description",
      content: "We joyfully invite you to attend our wedding",
    },
  ] as any[],
});

useHead(headData);

watch(
  [weddingData, rawGuest],
  ([wedding, guest]) => {
    if (!wedding) return;

    // 1. Title Resolution
    let resolvedTitle = wedding.title;
    if (guest && guest.custom_og_title) {
      resolvedTitle = guest.custom_og_title;
    } else if (guest && guest.guest_name) {
      const parentTitle = wedding.seo_settings?.title || wedding.title;
      resolvedTitle = `${parentTitle}`;
    } else if (wedding.seo_settings?.title) {
      resolvedTitle = wedding.seo_settings.title;
    }
    headData.title = resolvedTitle;

    // 2. Description Resolution
    let resolvedDescription = `Undangan Pernikahan untuk menghadiri acara ${wedding.title}`;
    if (guest && guest.custom_og_description) {
      resolvedDescription = guest.custom_og_description;
    } else if (wedding.seo_settings?.description) {
      resolvedDescription = wedding.seo_settings.description;
    } else if (wedding.seo_settings?.og?.description) {
      resolvedDescription = wedding.seo_settings.og.description;
    }

    // 3. Image Resolution
    let resolvedImage = wedding.image_cover || "";
    if (guest && guest.custom_og_image) {
      resolvedImage = guest.custom_og_image;
    } else if (wedding.seo_settings?.og?.image) {
      resolvedImage = wedding.seo_settings.og.image;
    } else if (wedding.seo_settings?.twitter?.image) {
      resolvedImage = wedding.seo_settings.twitter.image;
    }

    // 4. Keywords Resolution
    let resolvedKeywords = `wedding, invitation, pernikahan, ${wedding.title}`;
    if (Array.isArray(wedding.seo_settings?.keywords)) {
      resolvedKeywords = wedding.seo_settings.keywords.join(", ");
    }

    headData.meta = [
      { name: "description", content: resolvedDescription },
      { name: "keywords", content: resolvedKeywords },
      { property: "og:title", content: resolvedTitle },
      { property: "og:description", content: resolvedDescription },
      { property: "og:image", content: resolvedImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: resolvedTitle },
      { name: "twitter:description", content: resolvedDescription },
      { name: "twitter:image", content: resolvedImage },
    ];
  },
  { deep: true }
);

watch(
  isOpen,
  (val) => {
    if (val) {
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="isRestricted" class="restricted-container">
    <div class="restricted-card">
      <div class="lock-icon-container">
        <svg class="lock-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h1>Akses Terbatas</h1>
      <p>Mohon maaf, undangan ini bersifat privat dan hanya dapat diakses melalui link resmi yang dikirimkan oleh penyelenggara kepada tamu undangan yang terdaftar.</p>
      <div class="restricted-footer">{{ mempelaiPria }} & {{ mempelaiWanita }}</div>
    </div>
  </div>
  <div v-else class="flex flex-col mx-auto" style="max-width: 480px">
    <!-- Cover Section -->
    <div
      v-if="!isOpen"
      class="cover-section"
      :style="{ backgroundImage: themeStore.bgCover }"
    >
      <!-- Title and Names at Top with Background Image -->
      <div class="flex flex-col items-center pt-16 mt-4 relative">
        <!-- Background Image -->
        <img
          v-if="themeStore.wedding?.theme_override?.words?.show_the_wedding_of !== false"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          src="@/assets/images/IMG_1289.png"
          alt="Decoration"
          class="absolute top-8 w-64 opacity-80"
        />
        <!-- Text Content -->
        <p
          v-if="themeStore.wedding?.theme_override?.words?.show_the_wedding_of !== false"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="relative z-10"
          :style="{
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-accent)',
            fontSize: 'calc(32px * var(--font-scale-accent, 1))',
          }"
        >
          {{ themeStore.wedding?.theme_override?.words?.the_wedding_of || 'The Wedding Of' }}
        </p>
        <p
          v-if="themeStore.wedding?.theme_override?.words?.show_the_wedding_of !== false"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="text-center mt-2 relative z-10"
          :style="{
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-spouse_nickname)',
            fontSize: 'calc(32px * var(--font-scale-spouse_nickname)',
            lineHeight: '1.2',
          }"
        >
          {{ groomFirst ? mempelaiPria : mempelaiWanita }} & {{ groomFirst ? mempelaiWanita : mempelaiPria }}
        </p>
      </div>
    </div>
    <!-- Bottom Section - Separate from cover for fixed positioning -->
    <div v-if="!isOpen" class="bottom-section">
      <!-- Inner container with background -->
      <div
        class="bg-combo-linear rounded-3xl px-10 py-2 flex flex-col items-center"
      >
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="text-gray-600 text-center mb-0.5"
          style="font-family: 'Cochin Italic'; font-size: 14px"
        >
          {{
            themeStore.isEnglish
              ? "Dear Mr/Mrs/Ms"
              : "Kepada Yth. Bapak/Ibu/Saudara/i"
          }}
        </p>
        <p
          data-aos="zoom-in-up"
          data-aos-duration="2000"
          class="text-gray-700 text-center mt-0"
          style="font-family: 'Cochin Italic'; font-size: 20px"
        >
          {{ invitedPerson }}
        </p>
        <button
          @click="handleClick"
          data-aos-duration="2000"
          data-aos="zoom-in-up"
          class="px-6 py-2.5 rounded-full mt-3"
          :style="{ backgroundColor: 'var(--color-primary)' }"
        >
          <p
            class="text-white tracking-wide"
            style="
              font-family: var(--font-accent);
              font-size: calc(20px * var(--font-scale-accent, 1));
              text-transform: none;
            "
          >
            {{ themeStore.isEnglish ? "Open Invitation" : "Buka Undangan" }}
          </p>
        </button>
      </div>
    </div>
    <div
      v-show="isOpen"
      class="ios-fixed-background"
      :style="{ backgroundImage: themeStore.bgMain }"
    ></div>
    <div
      v-show="isOpen"
      class="flex flex-col mx-none md:mx-auto relative z-10"
      style="max-width: 480px"
    >
      <VideoSection v-if="weddingData?.video_url" />
      <WelcomeSection
        v-if="dataPernikahan.acara && dataPernikahan.acara.length > 0"
        :acara="dataPernikahan.acara"
        :countdownDate="countdownDate"
        :mempelaiPria="mempelaiPria"
        :mempelaiWanita="mempelaiWanita"
        id="welcomeSection"
      />
      <IntroductionFamilies
        v-if="dataPernikahan.pengantin && dataPernikahan.pengantin.length > 0"
        id="mempelaiSection"
        :tamu="dataPernikahan.tamu"
        :pengantin="dataPernikahan.pengantin"
      />
      <!-- <img
        src="https://ik.imagekit.io/AdminQinvi2/3d/Mar24/MaidaHazmi/03-8.webp?updatedAt=1711864752444"
        alt="Qinvi Wedding Photos Groom"
      /> -->

      <WeddingEvents
        v-if="dataPernikahan.acara && dataPernikahan.acara.length > 0"
        id="acaraSection"
        :acara="dataPernikahan.acara"
      />
      <AturCaraSection 
        :words="themeStore.wedding?.theme_override?.words" 
      />
      <InfoSection
        v-if="
          (themeStore.wedding?.theme_override?.words?.info_show !== false && themeStore.wedding?.theme_override?.words?.info_show !== 'false') &&
          themeStore.wedding?.theme_override?.words?.info_position !== 'below_gallery'
        "
      />
      <GalleryPhotos
        v-if="dataPernikahan.gallery && dataPernikahan.gallery.length > 0"
        id="gallerySection"
        :gallery="dataPernikahan.gallery"
      />
      <InfoSection
        v-if="
          (themeStore.wedding?.theme_override?.words?.info_show !== false && themeStore.wedding?.theme_override?.words?.info_show !== 'false') &&
          themeStore.wedding?.theme_override?.words?.info_position === 'below_gallery'
        "
      />

      <ElectronicWallet
        v-if="dataPernikahan.rekening && dataPernikahan.rekening.length > 0"
        id="walletSection"
        :rekening="dataPernikahan.rekening"
      />
      <AsmaralokaSection
        v-if="dataPernikahan.asmaraloka && dataPernikahan.asmaraloka.length > 0"
        :asmaraloka="dataPernikahan.asmaraloka"
      />
      <div class="flex flex-col px-8 pt-9">
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          class="flex flex-col pt-20 bg-container-shadow rounded-tema-jawa mb-10"
        >
          <PresenceForm :tamu="dataPernikahan.tamu" />
          <PrayerWishes @refresh-wishes="fetchHomeData" />
          <WishesList
            v-if="dataPernikahan.ucapan && dataPernikahan.ucapan.length > 0"
            :wishes="dataPernikahan.ucapan"
          />
        </div>
      </div>
      <ContactPersonSection 
        :words="themeStore.wedding?.theme_override?.words" 
      />
      <StorySection
        v-if="
          dataPernikahan.ceritaCinta && dataPernikahan.ceritaCinta.length > 0
        "
        :ceritaCinta="dataPernikahan.ceritaCinta"
      />

      <!-- <HealthProtocols /> -->

      <FooterWeddings />
      <!-- <FooterSections /> -->
      <Transition name="fade">
        <MenusFloating v-if="isOpen" @fnClick="(e) => handleMenuClick(e)" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.cover-section {
  background-color: var(--color-secondary);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  height: 100dvh;
  position: relative;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.bottom-section {
  position: fixed;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  z-index: 50;
}

.ios-fixed-background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  height: 100vh;
  height: 100dvh;
  z-index: 0;
}

.background-linear {
  background: linear-gradient(
    0deg,
    rgba(255, 247, 239, 0.47) 0%,
    rgba(244, 234, 225, 0.37) 0%
  );
}

.bg-linear-btn {
  background: linear-gradient(282.22deg, #000000 0%, #a98466 100%);
}

.bg-combo-linear {
  background: rgba(245, 243, 241, 0.77);
}

.restricted-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  max-width: 480px;
  background: linear-gradient(135deg, #0d0e15 0%, #171926 100%);
  padding: 1.5rem;
  box-sizing: border-box;
}
.restricted-card {
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.lock-icon-container {
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.lock-icon {
  color: #ff4d4d;
  filter: drop-shadow(0 4px 12px rgba(255, 77, 77, 0.3));
  animation: pulse 2s infinite ease-in-out;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.restricted-card h1 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ff4d4d, #f9ca24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.restricted-card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Outfit', sans-serif;
}
.restricted-footer {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Outfit', sans-serif;
}
</style>
