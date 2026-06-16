/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-10": "#1D4956",
        "blue-05": "#8EABB4",
        "brown-10": "#EAE0D4",
        "brown-20": "#F4EAE1",
        "brown-30": "#55391C",
        "green-40": "#333F24",
        "green-30": "#768C6E",
        "green-20": "#788C75",
        "green-10": "#EFF9ED",
        "grey-10": "#ABABAB",
        "yellow-10": "#FAFFD8",
        "yellow-20": "#E5D9B6",
        "gold-10": "#D1B28A",
        "theme-primary": "var(--color-primary)",
        "theme-secondary": "var(--color-secondary)",
        "theme-accent": "var(--color-accent)",
        "theme-text-dark": "var(--color-text-dark)",
        "theme-text-light": "var(--color-text-light)",
        "theme-text-body": "var(--color-text-body)",
      },
      fontFamily: {
        headline: "var(--font-headline)",
        body: "var(--font-body)",
        accent: "var(--font-accent)",
        script: "var(--font-script)",
        italic: "var(--font-italic)",
      },
    },
  },
  plugins: [],
};
