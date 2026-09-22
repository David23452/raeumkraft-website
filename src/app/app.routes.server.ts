import { RenderMode, ServerRoute } from '@angular/ssr';
import { EINSATZGEBIETE } from './core/data/einsatzgebiete';
import { LEISTUNGEN } from './core/data/leistungen';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'leistungen',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'leistungen/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return LEISTUNGEN.map((leistung) => ({ slug: leistung.slug }));
    },
  },
  {
    path: 'einsatzgebiete',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'einsatzgebiete/:landkreis',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return EINSATZGEBIETE.map((gebiet) => ({ landkreis: gebiet.slug }));
    },
  },
  {
    path: 'ueber-uns',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'kontakt',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'impressum',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'datenschutz',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
