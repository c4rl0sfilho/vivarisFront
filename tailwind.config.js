/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate:{
        '146':'146deg'
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        'meditacao-universe': "url('/src/assets/meditacaoUniverse.jpg')",
      },
    },
    
  },
  plugins: [],
}

