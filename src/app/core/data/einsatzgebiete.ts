export interface Einsatzgebiet {
  slug: string;
  name: string;
}

export const EINSATZGEBIETE: Einsatzgebiet[] = [
  { slug: 'pfaffenhofen', name: 'Landkreis Pfaffenhofen' },
  { slug: 'freising', name: 'Freising' },
  { slug: 'ingolstadt', name: 'Ingolstadt' },
  { slug: 'dachau', name: 'Dachau' },
  { slug: 'neuburg-schrobenhausen', name: 'Neuburg-Schrobenhausen' },
  { slug: 'eichstaett', name: 'Eichstätt' },
  { slug: 'aichach-friedberg', name: 'Aichach-Friedberg' },
  { slug: 'kelheim', name: 'Kelheim' },
];
