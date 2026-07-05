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
  spouse_text?: string;
  section_title?: string;
  event_opening_color?: string;
  form_label_color?: string;
  event_title_color?: string;
  event_detail_color?: string;
}

interface ThemeFontsConfig {
  headline: string;
  body: string;
  accent: string;
  script: string;
  italic: string;
  section?: string;
  spouse_nickname?: string;
  spouse_fullname?: string;
  parents?: string;
  event_opening?: string;
  form_label?: string;
  event_title?: string;
  event_detail?: string;
}

interface ThemeBackgroundsConfig {
  cover: string;
  main_bg: string;
  spouse_section: string;
  footer_bg: string;
  countdown_bg: string;
  left_bg?: string;
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
  info_position?: string;
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
  music_start?: number | null;
  music_end?: number | null;
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
  spouse_text: "#1F1C1F",
  section_title: "#1F1C1F",
  event_opening_color: "#1F1C1F",
  form_label_color: "#55391C",
};

const DEFAULT_FONTS: ThemeFontsConfig = {
  headline: "'Bon Vivant Family Serif'",
  body: "'Noto Sans', sans-serif",
  accent: "'Wonderia'",
  script: "'FormaleScript'",
  italic: "'Cormorant Garamond'",
  section: "'Aston Script'",
  spouse_nickname: "'FormaleScript'",
  spouse_fullname: "'Cormorant Garamond'",
  parents: "'Monesta Bpld'",
  event_opening: "'Cormorant Garamond'",
  form_label: "'Cormorant Garamond'",
  event_title: "'Bon Vivant Family Serif'",
  event_detail: "'Cormorant Garamond'",
};

const DEFAULT_BACKGROUND_URLS: Record<string, string> = {
  cover: "",
  main_bg: "",
  spouse_section: "",
  footer_bg: "",
  countdown_bg: "",
  left_bg: "",
};

const DEFAULT_IMAGE_URLS: Record<string, string> = {
  logo_mempelai: "",
  ornament_divider: "",
  header_events: "",
  building_icon: "",
};

const formatBackgroundCSS = (url: any): string => {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("url(") ||
    trimmed.startsWith("linear-gradient(") ||
    trimmed.startsWith("radial-gradient(") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("rgb(") ||
    trimmed.startsWith("rgba(") ||
    trimmed.startsWith("hsl(") ||
    trimmed.startsWith("hsla(") ||
    trimmed.startsWith("transparent")
  ) {
    return trimmed;
  }
  return `url(${trimmed})`;
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
    return formatBackgroundCSS(url);
  });

  const bgLeft = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.left_bg;
    const url = override || (wedding.value?.theme_override as ThemeConfig)?.backgrounds?.cover || wedding.value?.image_cover;
    return formatBackgroundCSS(url);
  });

  const bgMain = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.main_bg;
    const fromWedding = wedding.value?.image_bg1;
    const fromTheme = themeConfig.value?.backgrounds?.main_bg;
    const url =
      fromWedding || override || fromTheme || DEFAULT_BACKGROUND_URLS.main_bg;
    return formatBackgroundCSS(url);
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
    return formatBackgroundCSS(url);
  });

  const bgFooter = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.footer_bg;
    const fromTheme = themeConfig.value?.backgrounds?.footer_bg;
    const url = override || fromTheme || DEFAULT_BACKGROUND_URLS.footer_bg;
    return formatBackgroundCSS(url);
  });

  const bgCountdown = computed(() => {
    const override = (wedding.value?.theme_override as ThemeConfig)?.backgrounds
      ?.countdown_bg;
    const fromTheme = themeConfig.value?.backgrounds?.countdown_bg;
    const url = override || fromTheme || DEFAULT_BACKGROUND_URLS.countdown_bg;
    return formatBackgroundCSS(url);
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
    const cleanFamily = family.replace(/['"]/g, "").replace(/\+/g, " ").trim();
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
    const slots = ["headline", "body", "accent", "script", "italic", "section", "spouse_nickname", "spouse_fullname", "parents", "event_opening", "form_label", "event_title", "event_detail"];
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
      if (value) {
        const cleanedValue = value.replace(/\+/g, " ");
        root.style.setProperty(`--font-${key}`, cleanedValue);
      }
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
      left_bg: bgDefaults.left_bg || wedding.value?.image_cover || bgDefaults.cover || "",
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
    bgLeft,
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
