module.exports = {
  purge: [
    './static/**/*.css',
    './views/**/*.ejs',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
  
}