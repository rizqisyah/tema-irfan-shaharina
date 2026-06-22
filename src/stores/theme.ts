import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

interface ThemeColorsConfig {
  primary: string;
  secondary: string;
  accent: string;
  text_dark: string;
  text_light: string;
  text_body: string;
  bg_body: string;
  atur_cara_primary?: string;
  atur_cara_time?: string;
  contact_primary?: string;
}

interface ThemeFontsConfig {
  headline: string;
  body: string;
  accent: string;
  script: string;
  italic: string;
  section?: string;
}

interface ThemeBackgroundsConfig {
  cover: string;
  main_bg: string;
  spouse_section: string;
  footer_bg: string;
  countdown_bg: string;
}

interface ThemeImagesConfig {
  logo_mempelai: string;
  ornament_divider: string;
  header_events: string;
  building_icon: string;
}

interface ThemeWordsConfig {
  quote_text?: string;
  quote_verse?: string;
  opening_message?: string;
  hashtag?: string;
  info_show?: boolean;
  info_title?: string;
  info_items?: string;
  atur_cara_show?: boolean;
  atur_cara_title?: string;
  atur_cara_items?: string;
  contact_show?: boolean;
  contact_title?: string;
  contact_items?: string;
}

interface ThemeConfig {
  colors?: Partial<ThemeColorsConfig>;
  fonts?: Partial<ThemeFontsConfig>;
  backgrounds?: Partial<ThemeBackgroundsConfig>;
  images?: Partial<ThemeImagesConfig>;
  words?: Partial<ThemeWordsConfig>;
  fonts_custom?: Record<string, { url: string; family: string }>;
  font_scales?: Record<string, number>;
}

interface WeddingData {
  id?: string;
  client_id?: string;
  slug?: string;
  title?: string;
  theme_code?: string;
  theme_version?: number;
  theme_override?: Record<string, any>;
  countdown_date?: string | null;
  music_url?: string | null;
  video_url?: string | null;
  image_cover?: string | null;
  image_bg1?: string | null;
  image_bg2?: string | null;
  image_spouse?: string | null;
  image_logo?: string | null;
  logo_mempelai?: string | null;
  theme_name?: string | null;
  order_groom_first?: boolean;
  seo_settings?: Record<string, any>;
  is_active?: boolean;
  lang?: string | null;
}

const DEFAULT_COLORS: ThemeColorsConfig = {
  primary: "#6D735B",
  secondary: "#F5F3F1",
  accent: "#D4AF37",
  text_dark: "#1F1C1F",
  text_light: "#FFFFFF",
  text_body: "#424242",
  bg_body: "#F5F3F1",
};

const DEFAULT_FONTS: ThemeFontsConfig = {
  headline: "'Bon Vivant Family Serif'",
  body: "'Noto Sans', sans-serif",
  accent: "'Wonderia'",
  script: "'FormaleScript'",
  italic: "'Cormorant Garamond'",
  section: "'Aston Script'",
};

const DEFAULT_BACKGROUND_URLS: Record<string, string> = {
  cover: "",
  main_bg: "",
  spouse_section: "",
  footer_bg: "",
  countdown_bg: "",
};

const DEFAULT_IMAGE_URLS: Record<string, string> = {
  logo_mempelai: "",
  ornament_divider: "",
  header_events: "",
  building_icon: "",
};

export const useThemeStore = defineStore("theme", () => {
  const themeConfig = ref<ThemeConfig | null>(null);
  const wedding = ref<WeddingData | null>(null);

  const bgCover = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.cover;
    const fromWedding = wedding.value?.image_cover;
    const fromTheme = themeConfig.value?.backgrounds?.cover;
    const url =
      fromWedding || override || fromTheme || DEFAULT_BACKGROUND_URLS.cover;
    return url ? `url(${url})` : "";
  });

  const bgMain = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.main_bg;
    const fromWedding = wedding.value?.image_bg1;
    const fromTheme = themeConfig.value?.backgrounds?.main_bg;
    const url =
      fromWedding || override || fromTheme || DEFAULT_BACKGROUND_URLS.main_bg;
    return url ? `url(${url})` : "";
  });

  const bgSpouse = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.spouse_section;
    const fromWedding = wedding.value?.image_bg2;
    const fromTheme = themeConfig.value?.backgrounds?.spouse_section;
    const url =
      fromWedding ||
      override ||
      fromTheme ||
      DEFAULT_BACKGROUND_URLS.spouse_section;
    return url ? `url(${url})` : "";
  });

  const bgFooter = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.footer_bg;
    const fromTheme = themeConfig.value?.backgrounds?.footer_bg;
    const url = override || fromTheme || DEFAULT_BACKGROUND_URLS.footer_bg;
    return url ? `url(${url})` : "";
  });

  const bgCountdown = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.countdown_bg;
    const fromTheme = themeConfig.value?.backgrounds?.countdown_bg;
    const url = override || fromTheme || DEFAULT_BACKGROUND_URLS.countdown_bg;
    return url ? `url(${url})` : "";
  });

  const imgLogo = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.images
      ?.logo_mempelai;
    const fromWedding = wedding.value?.image_logo;
    const fromTheme = themeConfig.value?.images?.logo_mempelai;
    const url =
      fromWedding || override || fromTheme || DEFAULT_IMAGE_URLS.logo_mempelai;
    return url ? `url(${url})` : "";
  });

  const imgOrnament = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.images
      ?.ornament_divider;
    const fromTheme = themeConfig.value?.images?.ornament_divider;
    const url = override || fromTheme || DEFAULT_IMAGE_URLS.ornament_divider;
    return url ? `url(${url})` : "";
  });

  const imgHeaderEvents = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.images
      ?.header_events;
    const fromTheme = themeConfig.value?.images?.header_events;
    const url = override || fromTheme || DEFAULT_IMAGE_URLS.header_events;
    return url ? `url(${url})` : "";
  });

  const imgBuilding = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.images
      ?.building_icon;
    const fromTheme = themeConfig.value?.images?.building_icon;
    const url = override || fromTheme || DEFAULT_IMAGE_URLS.building_icon;
    return url ? `url(${url})` : "";
  });

  const isEnglish = computed(() => {
    let queryLang: string | undefined;
    try {
      const route = useRoute();
      queryLang = route?.query?.lang as string | undefined;
    } catch (e) {
      // route not defined or outside router context
    }
    if (queryLang) {
      return ["en", "english"].includes(queryLang.toLowerCase().trim());
    }

    const dbLang = wedding.value?.lang;
    if (dbLang) {
      return ["en", "english"].includes(dbLang.toLowerCase().trim());
    }

    return false;
  });

  function setTheme(theme: any) {
    themeConfig.value = theme?.theme_config || null;
  }

  function setWedding(data: any) {
    if (data && typeof data.theme_override === "string") {
      try {
        data.theme_override = JSON.parse(data.theme_override);
      } catch (e) {
        console.error("Failed to parse theme_override:", e);
      }
    }
    wedding.value = data || null;
  }

  function injectCustomFont(family: string, url: string) {
    if (typeof document === "undefined") return;
    const cleanFamily = family.replace(/['"]/g, "").trim();
    const id = `custom-font-${cleanFamily.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;

    if (url.includes("fonts.googleapis.com")) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    } else {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = `@font-face { font-family: '${cleanFamily}'; src: url('${url}'); font-display: swap; }`;
      document.head.appendChild(style);
    }
  }

  function applyTheme() {
    const root = document.documentElement;
    const cfg = themeConfig.value;
    let override: ThemeConfig = {};
    try {
      override = typeof wedding.value?.theme_override === "string"
        ? JSON.parse(wedding.value.theme_override)
        : wedding.value?.theme_override || {};
    } catch (e) {
      override = {};
    }

    // Inject custom uploaded fonts first
    if (override.fonts_custom) {
      Object.entries(override.fonts_custom).forEach(([_, val]) => {
        if (val && val.url && val.family) {
          injectCustomFont(val.family, val.url);
        }
      });
    }

    // Set font scales
    const fontScales = override.font_scales || {};
    const slots = ["headline", "body", "accent", "script", "italic", "section"];
    slots.forEach((slot) => {
      const scale = fontScales[slot] !== undefined ? fontScales[slot] : 1;
      root.style.setProperty(`--font-scale-${slot}`, String(scale));
    });

    // Colors: DEFAULT < theme_config < theme_override
    const colors = {
      ...DEFAULT_COLORS,
      ...(cfg?.colors || {}),
      ...(override.colors || {}),
    };
    console.log("APPLYING THEME COLORS:", colors);
    Object.entries(colors).forEach(([key, value]) => {
      if (value)
        root.style.setProperty(`--color-${key.replace(/_/g, "-")}`, value);
    });

    // Fonts: DEFAULT < theme_config < theme_override
    const fonts = {
      ...DEFAULT_FONTS,
      ...(cfg?.fonts || {}),
      ...(override.fonts || {}),
    };
    Object.entries(fonts).forEach(([key, value]) => {
      if (value) root.style.setProperty(`--font-${key}`, value);
    });

    // Backgrounds: DEFAULT < theme_config < theme_override.backgrounds < wedding.image_*
    const bgDefaults = {
      ...DEFAULT_BACKGROUND_URLS,
      ...(cfg?.backgrounds || {}),
      ...(override.backgrounds || {}),
    };
    const imgDefaults = {
      ...DEFAULT_IMAGE_URLS,
      ...(cfg?.images || {}),
      ...(override.images || {}),
    };

    const resolvedBgs: Record<string, string> = {
      cover: wedding.value?.image_cover || bgDefaults.cover || "",
      main_bg: wedding.value?.image_bg1 || bgDefaults.main_bg || "",
      spouse_section:
        wedding.value?.image_bg2 || bgDefaults.spouse_section || "",
      footer_bg: bgDefaults.footer_bg || "",
      countdown_bg: bgDefaults.countdown_bg || "",
    };
    Object.entries(resolvedBgs).forEach(([key, url]) => {
      if (url)
        root.style.setProperty(`--bg-${key.replace(/_/g, "-")}`, `url(${url})`);
    });

    // Images: DEFAULT < theme_config < theme_override < wedding.image_logo
    const resolvedImgs: Record<string, string> = {
      logo_mempelai:
        wedding.value?.image_logo || imgDefaults.logo_mempelai || "",
      ornament_divider: imgDefaults.ornament_divider || "",
      header_events: imgDefaults.header_events || "",
      building_icon: imgDefaults.building_icon || "",
    };
    Object.entries(resolvedImgs).forEach(([key, url]) => {
      if (url)
        root.style.setProperty(
          `--img-${key.replace(/_/g, "-")}`,
          `url(${url})`
        );
    });
  }

  return {
    themeConfig,
    wedding,
    bgCover,
    bgMain,
    bgSpouse,
    bgFooter,
    bgCountdown,
    imgLogo,
    imgOrnament,
    imgHeaderEvents,
    imgBuilding,
    isEnglish,
    setTheme,
    setWedding,
    applyTheme,
  };
});
