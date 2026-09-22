export interface Leistung {
  slug: string;
  name: string;
}

export const LEISTUNGEN: Leistung[] = [
  { slug: 'entruempelung', name: 'Entrümpelung' },
  { slug: 'haushaltsaufloesung', name: 'Haushaltsauflösung' },
  { slug: 'messie-wohnung', name: 'Messie-Wohnung' },
  { slug: 'buero-gewerbeaufloesung', name: 'Büro- & Gewerbeauflösung' },
  { slug: 'nachlassaufloesung', name: 'Nachlassauflösung' },
  { slug: 'sperrmuell-entsorgung', name: 'Sperrmüll & Entsorgung' },
];
