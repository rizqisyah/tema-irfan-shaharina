<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import HomeService from "@/services/resources/home.service";
import { useRoute } from "vue-router";
import { useSnackbar } from "vue3-snackbar";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
const snackbar = useSnackbar();
const route = useRoute();
const emit = defineEmits(["refresh-wishes"]);

type FromTypes = {
  from: string;
  message: string;
};

const loading: Ref<boolean> = ref(false);
const showSuccessModal: Ref<boolean> = ref(false);

const form: Ref<FromTypes> = ref({
  from: "",
  message: "",
});

const handleSubmit = async (): Promise<void> => {
  // API DISABLED - Just show success without calling server
  loading.value = true;

  // Simulate a small delay
  // setTimeout(() => {
  //   snackbar.add({
  //     type: "success",
  //     title: "Success",
  //     text: "Berhasil mengirim doa dan ucapan",
  //     group: "5862a88b",
  //     count: 1,
  //   });
  //   showSuccessModal.value = true;
  //   form.value.from = "";
  //   form.value.message = "";
  //   loading.value = false;
  // }, 500);

  const payload = {
    guest_name: form.value?.from,
    message: form.value?.message,
  };

  const secureId: string = route.params?.username as string;

  await HomeService.postWishes(payload, secureId)
    .then(({ data: { data, message } }) => {
      if (data) {
        snackbar.add({
          type: "success",
          title: themeStore.isEnglish ? "Success" : "Berhasil",
          text: themeStore.isEnglish
            ? "Your wishes and prayers have been sent successfully"
            : "Doa dan ucapan berhasil dikirim",
          group: "5862a88b",
          count: 1,
        });
        showSuccessModal.value = true;
        form.value.from = "";
        form.value.message = "";
        emit("refresh-wishes");
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
          ? "Failed to send wishes and prayers"
          : "Gagal mengirim doa dan ucapan",
        group: "5862a88b",
        count: 1,
      });
    })
    .finally(() => (loading.value = false));
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col px-6 pb-6 pt-8">
      <p
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="body-777 mb-2 text-center"
      >
        {{ themeStore.isEnglish ? "Wishes and Prayers" : "Doa dan Ucapan" }}
      </p>

      <div class="flex flex-col">
        <p class="headline-12 mb-1.5">
          {{ themeStore.isEnglish ? "Name" : "Nama" }}
        </p>
        <input
          v-model="form.from"
          type="text"
          id="fname"
          name="fname"
          class="rounded-sm mb-5 p-2 text-brown-30"
        />
        <p class="headline-12 mb-1.5">
          {{
            themeStore.isEnglish
              ? "Send your wishes and prayers:"
              : "Kirimkan doa dan ucapan Anda:"
          }}
        </p>
        <textarea
          v-model="form.message"
          class="rounded-sm p-2 text-brown-30"
          id="prayer"
          name="prayer"
          rows="4"
          cols="50"
        />
      </div>
      <div class="flex flex-col pt-5">
        <button
          class="button-date border border-white bg-yellow-20 py-1.5 px-3 rounded-2xl flex flex-row justify-center items-center space-x-2.5 drop-shadow-md"
          @click="handleSubmit"
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
            {{ themeStore.isEnglish ? "Send Wishes" : "Kirim Ucapan" }}
          </p>
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        class="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full text-center transform transition-all scale-100"
      >
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
        >
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ themeStore.isEnglish ? "Success!" : "Berhasil!" }}
        </h3>
        <p class="text-sm text-gray-500 mb-6">
          {{
            themeStore.isEnglish
              ? "Your wishes and prayers have been successfully sent."
              : "Doa dan ucapan Anda berhasil dikirim."
          }}
        </p>
        <button
          @click="showSuccessModal = false"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-20 text-base font-medium text-brown-30 hover:bg-yellow-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
        >
          {{ themeStore.isEnglish ? "Close" : "Tutup" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
