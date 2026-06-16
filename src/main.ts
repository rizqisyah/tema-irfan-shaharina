import { createApp } from "vue";
import { createPinia } from "pinia";

// Vue Snackbar
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";

// Vue Easy Light Box
import VueEasyLightbox from "vue-easy-lightbox";

// Vue Custom Head
import { createHead } from "@vueuse/head";

// Vue AOS
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";
import router from "./router";

import "./style.css";
import "./assets/main.css";

const app = createApp(App);
const head = createHead();

app.use(AOS.init());
app.use(head);
app.use(SnackbarService);
app.use(VueEasyLightbox);
app.component("vue3-snackbar", Vue3Snackbar);
app.use(createPinia());
app.use(router);

app.mount("#app");
