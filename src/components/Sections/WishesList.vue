<template>
  <div
    id="wishes-container"
    class="flex flex-col max-h-96 py-4 px-6 overflow-scroll mb-8"
  >
    <WishesComponents
      :username="e.guest_name || e.nama"
      :date="e.created_at || e.createdAt"
      :wish="e.message || e.ucapan"
      v-for="(e, i) in props.wishes"
      :key="`wishes-${i}`"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import WishesComponents from "@/components/Sections/WishesComponents.vue";

interface WishesTypes {
  id?: string | number;
  nama?: string;
  guest_name?: string;
  createdAt?: string;
  created_at?: string;
  ucapan?: string;
  message?: string;
}

interface WishesPropsTypes {
  wishes: Array<WishesTypes>;
}

const props = defineProps<WishesPropsTypes>();

// const scroll = (wishesContainer: HTMLInputElement): void => {
//   const height = (
//     wishesContainer.scrollTop + wishesContainer.clientHeight
//   ).toFixed(0);
//   const offset = wishesContainer.scrollHeight;
//   const bottomOfWindow = Number(height) === offset;
//   if (bottomOfWindow) {
//     wishes.value = [
//       ...wishes.value,
//       {
//         nama: "Anggun Baru",
//         createdAt: "2 hour ago",
//         ucapan: `Happy wedding 💐 Semoga keluarga kecil kalian senantiasa diberahi kebahagiaan, kecukupan, dan kesehatan✨ Selamat beribadah bersama sampai jannah ya🙏🏻`,
//       },
//     ];
//   }
// };

onMounted(() => {
  // const wishesContainer: HTMLInputElement = document.getElementById(
  //   "wishes-container"
  // ) as HTMLInputElement;
  // wishesContainer.onscroll = () => scroll(wishesContainer as HTMLInputElement);
  // wishesContainer.ontouchmove = () =>
  //   scroll(wishesContainer as HTMLInputElement);
});
</script>
