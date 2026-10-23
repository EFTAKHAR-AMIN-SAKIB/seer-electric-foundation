import fs from 'fs';
import path from 'path';

const distDir = path.resolve(import.meta.dirname, '../dist');
const pages = ['app', 'deep', 'futarchy', 'opportunity', 'risk', 'rationale'];

pages.forEach(p => {
  const htmlFile = path.join(distDir, `${p}.html`);
  const pageDir = path.join(distDir, p);

  if (fs.existsSync(htmlFile)) {
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    fs.copyFileSync(htmlFile, path.join(pageDir, 'index.html'));
    console.log(`✓ Copied ${p}.html -> ${p}/index.html for static server directory index support`);
  }
});
