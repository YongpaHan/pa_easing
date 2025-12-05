import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "pa_easing",
      fileName: (format) => `pa_easing.${format}.js`,
    },
    rollupOptions: {
      external: ["pa_vector"],
    },
  },
});
