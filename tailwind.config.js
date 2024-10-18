/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      // Paleta de colores principal
      color: {
        "deep-navy": "#213A57",
        "teal-blue": "#0B6477",
        "tropical-teal": "#14919B",
        "aqua-blue": "#0AD1C8",
        "mint-green": "#45DFB1",
        "light-mint": "#80ED99",
      },
      secondary: {     
        "white": "#FFFFFF",
        "gray": "#2D3748",
        "opaque": "#1A202C",
        "red": "#FF0000",
        "dark-100": "#3A3541",
        "gray-200": "#89868D",
        "gray-300": "#B4B2B7",
        
      },
      customBlue: {
        "blue-light": "#63B3ED",
        "blue-default": "#4299E1",
        "blue-dark": "#3182CE",
      },
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    fontSize: {
      "display-large": ["32px", { fontWeight: "900" }],
      "display-medium": ["30px", { fontWeight: "700" }],
      "display-small": ["28px", { fontWeight: "700" }],
      "heading-large": ["26px", { fontWeight: "900" }],
      "heading-medium": ["24px", { fontWeight: "700" }],
      "heading-small": ["22px", { fontWeight: "700" }],
      "title-large": ["20px", { fontWeight: "500" }],
      "title-medium": ["18px", { fontWeight: "500" }],
      "title-small": ["16px", { fontWeight: "500" }],
      "body-large": ["16px", { fontWeight: "400" }],
      "body-medium": ["14px", { fontWeight: "400" }],
      "body-small": ["12px", { fontWeight: "400" }],
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
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "gradient": {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient": "gradient 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
