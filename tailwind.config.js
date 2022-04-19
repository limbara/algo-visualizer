module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        'imperial-red': '#e63946',
        honeydew: '#f1faee',
        'powder-blue': '#a8dadc',
        'celadon-blue': '#457b9d',
        'prussian-blue': '#1d3557',
      },
      screens: {
        esm: '320px',
      },
      fontFamily: {
        inria: ['"Inria Sans"', '"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
