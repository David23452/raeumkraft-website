import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'leistungen',
    loadComponent: () =>
      import('./pages/leistungen/leistungen-uebersicht/leistungen-uebersicht').then(
        (m) => m.LeistungenUebersicht,
      ),
  },
  {
    path: 'leistungen/:slug',
    loadComponent: () =>
      import('./pages/leistungen/leistung-detail/leistung-detail').then(
        (m) => m.LeistungDetail,
      ),
  },
  {
    path: 'einsatzgebiete',
    loadComponent: () =>
      import(
        './pages/einsatzgebiete/einsatzgebiete-uebersicht/einsatzgebiete-uebersicht'
      ).then((m) => m.EinsatzgebieteUebersicht),
  },
  {
    path: 'einsatzgebiete/:landkreis',
    loadComponent: () =>
      import('./pages/einsatzgebiete/einsatzgebiet-detail/einsatzgebiet-detail').then(
        (m) => m.EinsatzgebietDetail,
      ),
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/ueber-uns/ueber-uns').then((m) => m.UeberUns),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/kontakt/kontakt').then((m) => m.Kontakt),
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then((m) => m.Impressum),
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./pages/datenschutz/datenschutz').then((m) => m.Datenschutz),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
