import { RenderMode, ServerRoute } from '@angular/ssr';
import { LOCATIONS } from './core/data/locations';
import { SERVICES } from './core/data/services';

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
    path: 'leistungen/:service',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICES.map((s) => ({ service: s.slug }));
    },
  },
  {
    path: 'leistungen/:service/:ort',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICES.flatMap((s) => LOCATIONS.map((l) => ({ service: s.slug, ort: l.slug })));
    },
  },
  {
    path: 'einsatzgebiete',
    renderMode: RenderMode.Prerender,
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
