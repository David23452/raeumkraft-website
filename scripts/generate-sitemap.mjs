/**
 * Generates src/sitemap.xml from the prerendered dist/browser/ folder.
 * Run after `ng build`: npm run generate:sitemap
 *
 * Pages in dist/browser/ are exactly what Angular prerendered —
 * no separate slug list needed.
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist', 'raeumkraft-website', 'browser');
const OUTPUT = join(DIST_DIR, 'sitemap.xml');
const BASE_URL = 'https://raum-kraft.de';

// Pages that should not appear in the sitemap
const EXCLUDE = new Set(['/404', '/**']);

function collectPaths(dir, base = dir, result = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPaths(full, base, result);
    } else if (entry.name === 'index.html') {
      const rel = relative(base, dir).replace(/\\/g, '/');
      const urlPath = rel ? `/${rel}/` : '/';
      if (!EXCLUDE.has(urlPath)) result.push(urlPath);
    }
  }
  return result;
}

const paths = collectPaths(DIST_DIR).sort();

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(OUTPUT, xml, 'utf-8');
console.log(`sitemap.xml written with ${paths.length} URLs → ${OUTPUT}`);
