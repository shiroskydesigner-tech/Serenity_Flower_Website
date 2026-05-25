import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://serenity-flower.example',
  output: 'static',
  // (Thumbnails live in public/_contact_sheets/ and are served as static files.
  //  Source originals are read server-side by /api/admin/* — never served to the browser.)
});
