<script setup lang="ts">
import { ref } from "vue";
import { useSnackbar } from "vue3-snackbar";
import { useThemeStore } from "@/stores/theme";
import BNI_Logo from "@/assets/images/BNI_logo.svg";
import BCA_Logo from "@/assets/images/BCA_logo.png";
import Mandiri_Logo from "@/assets/images/Mandiri_logo.webp";
import BTN_Logo from "@/assets/images/BTN_logo.svg";
import BRI_Logo from "@/assets/images/BRI_logo.svg";
import Cimb_Logo from "@/assets/images/cimb_logo.png";
import BSI_Logo from "@/assets/images/BSI_logo.png";
import Dana_Logo from "@/assets/images/logo-dana.png";
import Sulsel_Logo from "@/assets/images/logo-sulsel.jpg";
import Kalsel_logo from "@/assets/images/kalsel_logo.webp";
import Bjb_logo from "@/assets/images/bjb_logoo.png";
import Permata_logo from "@/assets/images/Permata_logo.png";
import Seabank_logo from "@/assets/images/logo-seabank.png";
import Jago_logo from "@/assets/images/bank-jago.png";
import Mualamat_logo from "@/assets/images/logo_muamalat.png";
import common_logo from "@/assets/images/common-bank.png";
import kado_logo  from  "@/assets/images/Kado.png";

const themeStore = useThemeStore();
const snackbar = useSnackbar();


type RekeningTypes = {
  id: string | number;
  wedding_id?: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  created_at?: string;
  // Fallbacks for compatibility
  createdAt?: string;
  namaBank?: string;
  namaPemilik?: string;
  noRekening?: string;
  updatedAt?: string;
  userId?: number;
};

type RekeningPropsTypes = {
  rekening: Array<RekeningTypes>;
};

const props = defineProps<RekeningPropsTypes>();

const handleIconBank = (e: string): string => {
  if (!e) return "";

  const bank: string = e.trim().toLowerCase();
  if (bank == "bni") return BNI_Logo;
  else if (bank == "bca") return BCA_Logo;
  else if (bank == "mandiri") return Mandiri_Logo;
  else if (bank == "btn") return BTN_Logo;
  else if (bank == "bri") return BRI_Logo;
  else if (bank == "cimb niaga") return Cimb_Logo;
  else if (bank == "bsi") return BSI_Logo;
  else if (bank == "dana") return Dana_Logo;
  else if (bank == "sulselbar syariah") return Sulsel_Logo;
  else if (bank == "kalsel") return Kalsel_logo;
  else if (bank == "bjb") return Bjb_logo;
  else if (bank == "permata") return Permata_logo;
  else if (bank == "seabank") return Seabank_logo;
  else if (bank == "jago") return Jago_logo;
  else if (bank == "muamalat") return Mualamat_logo;
  else if (bank == "commonwealth bank") return common_logo;
  else if (bank == "kado") return kado_logo;
  return "";
};

const handleCopy = (i: number, bankName: string): void => {
  let codeToCopy = document.getElementById(
    `copy-rekening-${i}`
  ) as HTMLInputElement;
  codeToCopy?.setAttribute("type", "text");
  codeToCopy?.select();
  const isKado = (bankName || '').toLowerCase().trim() === 'kado';
  const isEng = themeStore.isEnglish;
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    snackbar.add({
      type: "success",
      title: isEng ? "Success" : "Berhasil",
      text: isKado
        ? (isEng ? "Address copied successfully" : "Alamat berhasil disalin")
        : (isEng ? "Account number copied successfully" : "Nomor rekening berhasil disalin"),
      group: "5862a88b",
      count: 1,
    });
  } catch (err) {
    snackbar.add({
      type: "error",
      title: isEng ? "Failed" : "Gagal",
      text: isEng ? "Oops, failed to copy!" : "Oops, gagal menyalin!",
      group: "5862a88b",
      count: 1,
    });
  }
  codeToCopy?.setAttribute("type", "hidden");
  window?.getSelection()?.removeAllRanges();
};

const getAccountLabel = (bankName: string): string => {
  const name = (bankName || '').toLowerCase().trim();
  const isEng = themeStore.isEnglish;
  if (name === 'kado') return isEng ? 'Address' : 'Alamat';
  if (name === 'commonwealth bank') return 'PayId';
  return isEng ? 'Account No.' : 'No. Rekening';
};

const handleCopyAddress = (): void => {
  let codeToCopy = document.getElementById(
    `copy-address`
  ) as HTMLInputElement;
  codeToCopy?.setAttribute("type", "text");
  codeToCopy?.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    snackbar.add({
      type: "success",
      title: "Berhasil",
      text: `Alamat berhasil disalin`,
      group: "5862a88b",
      count: 1,
    });
  } catch (err) {
    snackbar.add({
      type: "error",
      title: "Gagal",
      text: `Oops, gagal menyalin!`,
      group: "5862a88b",
      count: 1,
    });
  }
  codeToCopy?.setAttribute("type", "hidden");
  window?.getSelection()?.removeAllRanges();
};

const showQris = ref(false);
</script>

<template>
  <div class="flex flex-col relative" id="walletSection">
    <div class="flex flex-col px-4 py-6">
      <div
        data-aos="zoom-in-up"
        data-aos-duration="2000"
        class="flex flex-col bg-container-shadow rounded-xl p-6 mb-8 text-center items-center"
      >
        <p class="headline-188 text-black mb-4 font-extralight">
          {{ themeStore.isEnglish ? 'Digital Gift' : 'Kado Digital' }}
        </p>
        <p class="caption-1 text-black">
          {{ themeStore.isEnglish ? 'Your presence and prayers are the most beautiful gift for us. However, if you wish to send a token of love, you may send it through:' : 'Doa restu Anda merupakan karunia terindah bagi kami. Namun, apabila Anda ingin memberikan tanda kasih kepada kami, Anda dapat mengirimkannya melalui:' }}
        </p>
      </div>

      <div
        v-for="(e, i) in props.rekening"
        :key="i"
        class="flex flex-col bg-container-shadow items-center rounded-xl p-4 mb-3 z-10"
      >
        <input
          type="hidden"
          :id="`copy-rekening-${i}`"
          :value="e.account_number || e.noRekening"
        />
        <img
          :src="handleIconBank(e.bank_name || e.namaBank || '')"
          width="100"
          height="19"
          class="mb-3"
        />
        <p class="caption-1 text-blue-10 mb-3">
          {{ getAccountLabel(e.bank_name || e.namaBank || '') }} : {{ e.account_number || e.noRekening }}
        </p>
        <p class="caption-1 text-blue-10 mb-3">
          {{ themeStore.isEnglish ? 'Account Name' : 'Atas Nama' }}: {{ e.account_name || e.namaPemilik }}
        </p>
        <div class="flex flex-col items-center">
          <button
            @click="() => handleCopy(i, e.bank_name || e.namaBank || '')"
            class="button-date border border-white bg-blue-10 py-1.5 px-3 rounded-2xl flex flex-row items-center space-x-2.5 drop-shadow-md"
          >
            <img
              src="@/assets/icons/icon-copy.png"
              class="brightness-0 invert"
              height="18"
              width="18"
            />
            <p class="body-2 text-white">
              {{ (e.bank_name || e.namaBank || '').toLowerCase().trim() === 'kado' ? (themeStore.isEnglish ? 'Copy Address' : 'Salin Alamat') : (themeStore.isEnglish ? 'Copy Number' : 'Salin Nomor') }}
            </p>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
