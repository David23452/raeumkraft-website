// ⚠️ PLATZHALTER — bitte gegen deine echten Leistungen austauschen.
// Diese Liste ist die einzige Quelle für Namen/Slugs deiner Leistungen.
// Der "slug" landet 1:1 in der URL, z.B. /leistungen/garagenentruempelung

export interface Service {
  slug: string;
  name: string;
  kurzbeschreibung: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'garagenentruempelung',
    name: 'Garagenentrümpelung',
    kurzbeschreibung:
      'Schnelle und saubere Räumung deiner Garage – von Sperrmüll bis Altreifen.',
  },
  {
    slug: 'haushaltsaufloesung',
    name: 'Haushaltsauflösung',
    kurzbeschreibung:
      'Komplette Auflösung von Haushalten, z.B. nach einem Todesfall oder Umzug.',
  },
  {
    slug: 'kellerentruempelung',
    name: 'Kellerentrümpelung',
    kurzbeschreibung:
      'Wir räumen deinen Keller leer – zuverlässig, auch bei schweren Lasten.',
  },
  {
    slug: 'dachbodenentruempelung',
    name: 'Dachbodenentrümpelung',
    kurzbeschreibung:
      'Platz schaffen im Dachboden – wir übernehmen Transport und Entsorgung.',
  },
  {
    slug: 'sperrmuellentsorgung',
    name: 'Sperrmüllentsorgung',
    kurzbeschreibung: 'Fachgerechte Entsorgung von Sperrmüll direkt bei dir vor Ort.',
  },
];

/**
 * Sucht eine Leistung anhand ihres Slugs.
 * Gibt `undefined` zurück, wenn kein Treffer existiert (ungültige URL).
 */
export function findService(slug: string | null): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
