<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  words?: any;
}>();

const primaryColor = computed(() => {
  return 'var(--color-contact-primary, var(--color-primary, #8B0000))';
});

const textColor = computed(() => {
  return 'var(--color-text-body, #1F1C1F)';
});

const showSection = computed(() => {
  return props.words?.contact_show === true || props.words?.contact_show === "true";
});

const sectionTitle = computed(() => {
  return props.words?.contact_title || "Hubungi";
});

interface ContactItem {
  phone: string;
  name: string;
}

const parsedContacts = computed<ContactItem[]>(() => {
  const raw = props.words?.contact_items;
  // Default values matching mockup
  const defaultText =
    "+6018 388 3364 (Nur Annisa)\n+6019 556 3500 (M. Alif Iqbal)\n+6016 683 8456 (Pn. Nor Azah)\n+6019 302 0789 (En. Mohamad Nor)\n+6017 264 2396 (Pn. Roshamida)\n+6017 564 1217 (En. M. Rosnani)";

  const text = raw !== undefined && raw !== null && raw.trim() !== "" ? raw : defaultText;

  return text
    .split("\n")
    .map((line: string) => {
      const trimmed = line.trim();
      let phone = "";
      let name = "";

      if (trimmed.includes("(")) {
        const parts = trimmed.split("(");
        phone = parts[0]?.trim() || "";
        name = parts[1]?.replace(")", "").trim() || "";
      } else if (trimmed.includes(" - ")) {
        const parts = trimmed.split(" - ");
        phone = parts[0]?.trim() || "";
        name = parts[1]?.trim() || "";
      } else {
        phone = trimmed;
        name = "";
      }

      return { phone, name };
    })
    .filter((item: ContactItem) => item.phone.length > 0);
});
</script>

<template>
  <div
    v-if="showSection"
    class="flex flex-col items-center px-8 py-10 text-center"
    id="contactSection"
  >
    <div
      data-aos="zoom-in-up"
      data-aos-duration="1500"
      class="flex flex-col pt-16 pb-12 px-6 bg-container-shadow rounded-tema-jawa relative overflow-hidden w-full"
    >
      <!-- Gold Arch Decoration -->
      <div class="arch-line"></div>

      <!-- Section Title -->
      <p
        class="mb-6 mt-2 relative z-10 tracking-wide text-center"
        :style="{
          fontFamily: 'var(--font-section), \'Aston Script\', cursive',
          fontSize: 'calc(22px * var(--font-scale-section, 1))',
          lineHeight: '1.2',
          color: primaryColor
        }"
      >
        {{ sectionTitle }}
      </p>

      <!-- Contacts List -->
      <div class="space-y-4 relative z-10 flex flex-col items-center justify-center w-full">
        <a
          v-for="(item, idx) in parsedContacts"
          :key="idx"
          :href="`tel:${item.phone.replace(/\s+/g, '')}`"
          class="flex flex-col items-center group no-underline"
          style="-webkit-tap-highlight-color: transparent;"
        >
          <div
            class="flex items-center space-x-2 font-serif font-bold italic text-[18px]"
            :style="{ color: primaryColor }"
          >
            <!-- Red Phone Icon SVG -->
            <svg
              class="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              style="width: 18px; height: 18px;"
              :style="{ color: primaryColor }"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.746 4.477a1 1 0 01-.54 1.014l-2.24 1.12a17.022 17.022 0 007.416 7.416l1.12-2.24a1 1 0 011.014-.54l4.477.746a1 1 0 01.836.986V21a1 1 0 01-1 1C6.012 22 2 17.988 2 11V3z" />
            </svg>
            <span :style="{ fontFamily: 'var(--font-italic), \'Times New Roman\', serif', fontSize: 'calc(18px * var(--font-scale-italic, 1))' }">{{ item.phone }}</span>
          </div>
          <span
            v-if="item.name"
            class="font-serif italic text-[14px] mt-0.5"
            :style="{
              fontFamily: 'var(--font-italic), \'Times New Roman\', serif',
              fontSize: 'calc(14px * var(--font-scale-italic, 1))',
              color: textColor
            }"
          >
            ({{ item.name }})
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-container-shadow {
  background-image: var(--img-logo-mempelai, url("@/assets/images/logo-mempelai.png"));
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
