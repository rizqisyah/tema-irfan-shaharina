<script setup lang="ts">
import type { Ref } from "vue";
import { ref, onMounted, watch } from "vue";
import HomeService from "@/services/resources/home.service";
import { useRoute } from "vue-router";
import { useSnackbar } from "vue3-snackbar";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const snackbar = useSnackbar();
const route = useRoute();

const props = defineProps<{
  tamu?: {
    namaTamu?: string;
    has_rsvp?: boolean;
    [key: string]: any;
  };
}>();

type FormKehadiranType = {
  nama: string;
  nomor_handphone: string;
  hadir: number;
  total_hadir: number;
};

const loading: Ref<boolean> = ref(false);
const alreadyRsvp: Ref<boolean> = ref(false);

const slug = (route.params?.username as string) || "default";
const guestCode = (route.query?.to as string) || "general";
const storageKey = `rsvp_${slug}_${guestCode}`;

const form: Ref<FormKehadiranType> = ref({
  nama: "",
  nomor_handphone: "",
  hadir: 0,
  total_hadir: 0,
});

watch(
  () => props.tamu,
  (newTamu) => {
    if (newTamu) {
      if (newTamu.has_rsvp) {
        alreadyRsvp.value = true;
      }
      if (newTamu.namaTamu && !form.value.nama) {
        form.value.nama = newTamu.namaTamu;
      }
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  alreadyRsvp.value =
    localStorage.getItem(storageKey) === "true" ||
    props.tamu?.has_rsvp === true;
});

const handleSubmit = async (): Promise<void> => {
  loading.value = true;
  const payload = {
    guest_name: form.value?.nama,
    phone: form.value?.nomor_handphone,
    attendance_status: form.value?.hadir === 1 ? "hadir" : "tidak_hadir",
    guest_count: form.value?.hadir === 1 ? Number(form.value?.total_hadir) : 0,
  };

  const secureId: string = route.params?.username as string;

  await HomeService.postPresence2(payload, secureId)
    .then(({ data: { data, message } }) => {
      if (data) {
        snackbar.add({
          type: "success",
          title: themeStore.isEnglish ? "Success" : "Berhasil",
          text: themeStore.isEnglish
            ? "Attendance confirmation sent successfully"
            : "Konfirmasi kehadiran berhasil dikirim",
          group: "5862a88b",
          count: 1,
        });

        localStorage.setItem(storageKey, "true");
        alreadyRsvp.value = true;

        form.value.nama = "";
        form.value.nomor_handphone = "";
        form.value.hadir = 0;
        form.value.total_hadir = 0;
      } else {
        throw new Error(message);
      }
    })
    .catch((err) => {
      console.error(err);
      snackbar.add({
        type: "error",
        title: themeStore.isEnglish ? "Failed" : "Gagal",
        text: themeStore.isEnglish
          ? "Failed to send attendance confirmation"
          : "Gagal mengirim konfirmasi kehadiran",
        group: "5862a88b",
        count: 1,
      });
    })
    .finally(() => (loading.value = false));
};

const handleConfirm = (): void => {
  if (
    confirm(
      themeStore.isEnglish
        ? "Are you sure about your RSVP confirmation?"
        : "Apakah Anda yakin dengan konfirmasi kehadiran Anda?"
    )
  ) {
    handleSubmit();
  }
};
</script>

<template>
  <div class="flex flex-col px-4 sm:px-6 py-6">
    <p
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="body-777 text-center font-extralight mb-5"
    >
      {{ themeStore.isEnglish ? "Rsvp Confirmation" : "Konfirmasi Kehadiran" }}
    </p>

    <!-- Already RSVP'd Success Message -->
    <div v-if="alreadyRsvp" class="flex flex-col items-center py-6 text-center">
      <div
        class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 animate-bounce"
      >
        <svg
          class="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p
        class="headline-12 text-center mb-2 font-bold"
        style="font-size: 1.25rem"
      >
        {{ themeStore.isEnglish ? "Thank You!" : "Terima Kasih!" }}
      </p>
      <p class="caption-1 text-center text-brown-30">
        {{
          themeStore.isEnglish
            ? "You have submitted your RSVP for this invitation."
            : "Anda telah melakukan konfirmasi kehadiran untuk undangan ini."
        }}
      </p>
    </div>

    <!-- RSVP Form -->
    <div v-else>
      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="headline-12 text-center mb-3"
      >
        {{
          themeStore.isEnglish
            ? "Please help us prepare for this event by confirming your attendance using the form below:"
            : "Bantu kami mempersiapkan acara ini dengan mengonfirmasi kehadiran Anda menggunakan formulir di bawah ini:"
        }}
      </p>

      <form action="#" @submit.prevent="handleConfirm">
        <div class="flex flex-col">
          <p class="headline-12 mb-1.5">
            {{ themeStore.isEnglish ? "Name" : "Nama" }}
          </p>
          <input
            :placeholder="themeStore.isEnglish ? 'Name' : 'Nama'"
            v-model="form.nama"
            type="text"
            id="fname"
            name="fname"
            class="rounded-sm mb-5 p-2 text-brown-30"
            required
          />
          <p class="headline-12 mb-1.5">
            {{ themeStore.isEnglish ? "Phone Number:" : "Nomor Handphone:" }}
          </p>
          <input
            v-model="form.nomor_handphone"
            :placeholder="
              themeStore.isEnglish ? 'Phone Number' : 'Nomor Handphone'
            "
            type="text"
            id="phone"
            name="phone"
            class="rounded-sm mb-5 p-2 text-brown-30"
            required
          />
        </div>
        <div class="flex flex-col">
          <p class="headline-12 mb-1.5">
            {{ themeStore.isEnglish ? "Attendance" : "Kehadiran" }}
          </p>

          <div class="flex flex-row space-x-12">
            <div class="flex flex-row space-x-2">
              <input
                type="radio"
                id="ya"
                name="fav_language"
                :value="1"
                v-model="form.hadir"
                required
              />
              <label class="text-brown-30 caption-1" for="ya">{{
                themeStore.isEnglish ? "Attending" : "Hadir"
              }}</label>
            </div>
            <div class="flex flex-row space-x-2">
              <input
                type="radio"
                id="tidak"
                name="fav_language"
                :value="0"
                v-model="form.hadir"
                required
              />
              <label class="text-brown-30 caption-1" for="tidak">{{
                themeStore.isEnglish ? "Not Attending" : "Tidak Hadir"
              }}</label>
            </div>
          </div>
          <div v-if="form.hadir === 1" class="mt-5">
            <p class="headline-12 mb-1.5">
              {{ themeStore.isEnglish ? "Number of Guests" : "Jumlah Tamu" }}
            </p>
            <input
              v-model="form.total_hadir"
              :placeholder="
                themeStore.isEnglish ? 'Number of Guests' : 'Jumlah Tamu'
              "
              type="number"
              id="total_hadir"
              name="total_hadir"
              class="rounded-sm mb-5 p-2 text-brown-30"
              required
            />
          </div>
        </div>
      </form>
      <div class="flex flex-col pt-5">
        <button
          class="button-date border border-white bg-yellow-20 py-1.5 px-3 mt-4 rounded-2xl flex flex-row justify-center items-center space-x-2.5"
          @click="handleConfirm"
          :disabled="loading"
        >
          <svg
            v-if="loading"
            class="animate-spin -ml-1 h-5 w-5 text-white"
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
          <p class="body-2 text-brown-30">
            {{ themeStore.isEnglish ? "Submit RSVP" : "Kirim Konfirmasi" }}
          </p>
        </button>
      </div>
    </div>

    <!-- RSVP Note & Contact Info -->
    <div
      data-aos="zoom-in-up"
      data-aos-duration="2000"
      class="mt-8 pt-6 border-t border-brown-30/20 text-center flex flex-col items-center"
    >
      <p class="caption-1 text-brown-30 leading-relaxed max-w-md mx-auto mb-4 italic">
        We look forward to your presence on our special day. Each invitation includes two guests; please contact us should you wish to bring more.
      </p>

      <div class="flex flex-col items-center space-y-1.5 mt-2">
        <p class="font-bold text-xs tracking-widest text-brown-30 uppercase">
          CONTACT :
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-sm text-brown-30">
          <a
            href="https://wa.me/60122162522"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            <span>Mysha</span>
            <span class="font-medium">+60122162522</span>
          </a>
          <span class="hidden sm:inline text-brown-30/40">•</span>
          <a
            href="https://wa.me/60139336322"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline flex items-center gap-1 transition-opacity hover:opacity-80"
          >
            <span>Asif</span>
            <span class="font-medium">+60139336322</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
