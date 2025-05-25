import type { Config } from "tailwindcss"
// @ts-ignore
import svgToDataUri from "mini-svg-data-uri";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primaryLight: {
          DEFAULT: "hsl(var(--primary-light))",
          foreground: "hsl(var(--primary-light-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // UFC theme colors - red, gray, black
        ufc: {
          red: {
            DEFAULT: "#D20A0A",
            light: "#FF1A1A",
            dark: "#A30808",
          },
          gray: {
            DEFAULT: "#333333",
            light: "#555555",
            dark: "#222222",
          },
          black: {
            DEFAULT: "#0A0A0A",
            light: "#1A1A1A",
            dark: "#000000",
          }
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        "heading": ["var(--font-satoshi)"],
        "default": ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grid": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "background-shine": {
          "from": { "backgroundPosition": "0 0" },
          "to": { "backgroundPosition": "-200% 0" }
        },
        "marquee": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "ripple": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)", },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)", },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)", },
        },
        "loading": {
          "to": {
            transform: "rotate(360deg)"
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 5px rgba(210, 10, 10, 0.5)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(210, 10, 10, 0.8)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grid": "grid 15s linear infinite",
        "background-shine": "background-shine 2s linear infinite",
        "marquee": "marquee var(--duration) linear infinite",
        "ripple": "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        "loading": "loading 0.6s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      spacing: {
        "1/8": "12.5%",
      },
      backgroundImage: {
        'ufc-gradient': 'linear-gradient(to right, #D20A0A, #333333, #0A0A0A)',
        'ufc-gradient-vertical': 'linear-gradient(to bottom, #D20A0A, #333333, #0A0A0A)',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    }),
  ],
} satisfies Config;

function addVariablesForColors({
  addBase,
  theme
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: { addBase: (styles: object) => void; theme: (key: string) => Record<string, any> }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config
