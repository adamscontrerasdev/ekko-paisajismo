import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      animation: {
        uniqueBounce: "uniqueBounce 1s ease-in-out forwards",
        uniqueBounceIcons: "uniqueBounceIcons 1s ease-in-out forwards 500ms",
        uniqueBounceContent: "uniqueBounceContent 1s ease-in-out forwards 500ms",
      },
      keyframes: {
        uniqueBounceContent: {
          "0%": {
            transform: "scaleY(1.2)",
            transformOrigin: "bottom",
            WebkitTransform: "scaleY(1.2)",          
            WebkitTransformOrigin: "bottom",       
          },
          "30%": {
            transform: "scaleY(0.9)",
            transformOrigin: "bottom",
            WebkitTransform: "scaleY(0.9)",        
            WebkitTransformOrigin: "bottom",       
          },
          "50%": {
            transform: "scaleY(1)",
            transformOrigin: "bottom",
            WebkitTransform: "scaleY(1)",          
            WebkitTransformOrigin: "bottom",       
          }
        },
        
        uniqueBounce: {
          "0%": {
            transform: "translateY(0)",
          },
          "30%": {
            transform: "translateY(-10px)",  
          },
          "50%": {
            transform: "translateY(0)",  
          },
          "70%": {
            transform: "translateY(-4px)",  
          },
          "100%": {
            transform: "translateY(0)",  
          },
        },
        uniqueBounceIcons: {
          "0%": {
            transform: "translateY(0)",
          },
          "20%": {
            transform: "translateY(-5px)",
          },
          "50%": {
            transform: "translateY(0)",  
          },
          "70%": {
            transform: "translateY(-2px)", 
          },
          "100%": {
            transform: "translateY(0)",  
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
