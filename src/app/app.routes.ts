import { Routes } from '@angular/router';

import { LeistungenUebersichtComponent } from './pages/leistungen-uebersicht/leistungen-uebersicht.component';
import { ServicePageComponent } from './pages/service-page/service-page.component';

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
    path: 'leistungen/garagenentruempelung',
    loadComponent: () =>
      import('./pages/leistungen/Garagen-Entruempelung/garagenentruempelung').then(
        (m) => m.Garagenentruempelung,
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
  {
    path: 'leistungen',
    component: LeistungenUebersichtComponent,
  },
  {
    // Generische Service-Seite ohne Ort, z.B. /leistungen/garagenentruempelung
    path: 'leistungen/:service',
    component: ServicePageComponent,
  },
  {
    // Service + Ort kombiniert, z.B. /leistungen/garagenentruempelung/schrobenhausen
    path: 'leistungen/:service/:ort',
    component: ServicePageComponent,
  },
];
