// Preisorientierung für die Startseite – einzige Stelle, an der die Preise
// gepflegt werden.
// TODO PRÜFEN: Preise vor dem Livegang final bestätigen.
// ­ = weicher Trennstrich, damit lange Wörter mobil sauber umbrechen.

export interface Preisorientierung {
  leistung: string;
  preis: string;
}

export const PREISORIENTIERUNG: readonly Preisorientierung[] = [
  { leistung: 'Kellerabteil oder kleiner Dachboden', preis: 'ab ca. 150 €' },
  { leistung: 'Garage oder einzelnes Zimmer', preis: 'ab ca. 400 €' },
  { leistung: 'Wohnung (Haushalts­auflösung)', preis: 'ca. 1.000–2.500 €' },
  { leistung: 'Einfamilien­haus mit Keller und Dachboden', preis: 'ca. 2.500–6.000 €' },
];
