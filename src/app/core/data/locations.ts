// ⚠️ PLATZHALTER — bitte gegen deine echte Orts-Liste austauschen.
// Basiert grob auf den Landkreisen aus deiner Firmeninfo; für "landkreis"
// eignet sich der Name für Fließtext-Bausteine ("...in X und Umgebung").

export interface Location {
  slug: string;
  name: string;
  landkreis: string;
}

export const LOCATIONS: Location[] = [
  { slug: 'pfaffenhofen-an-der-ilm', name: 'Pfaffenhofen an der Ilm', landkreis: 'Landkreis Pfaffenhofen' },
  { slug: 'ilmmuenster', name: 'Ilmmünster', landkreis: 'Landkreis Pfaffenhofen' },
  { slug: 'schrobenhausen', name: 'Schrobenhausen', landkreis: 'Landkreis Neuburg-Schrobenhausen' },
  { slug: 'neuburg-an-der-donau', name: 'Neuburg an der Donau', landkreis: 'Landkreis Neuburg-Schrobenhausen' },
  { slug: 'freising', name: 'Freising', landkreis: 'Landkreis Freising' },
  { slug: 'ingolstadt', name: 'Ingolstadt', landkreis: 'Ingolstadt' },
  { slug: 'dachau', name: 'Dachau', landkreis: 'Landkreis Dachau' },
  { slug: 'eichstaett', name: 'Eichstätt', landkreis: 'Landkreis Eichstätt' },
  { slug: 'aichach', name: 'Aichach', landkreis: 'Landkreis Aichach-Friedberg' },
  { slug: 'friedberg', name: 'Friedberg', landkreis: 'Landkreis Aichach-Friedberg' },
  { slug: 'kelheim', name: 'Kelheim', landkreis: 'Landkreis Kelheim' },
];

/**
 * Sucht einen Ort anhand seines Slugs.
 * `null`/`undefined`/kein Treffer → `undefined` (bedeutet: generische Service-Seite ohne Ort).
 */
export function findLocation(slug: string | null | undefined): Location | undefined {
  if (!slug) return undefined;
  return LOCATIONS.find((l) => l.slug === slug);
}
