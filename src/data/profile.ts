/**
 * Identité et liens — source unique, réutilisée par le header, la barre des tâches,
 * le footer et (plus tard) les sections.
 */
export const profile = {
  name: 'Youcef Kouaouci',
  /**
   * Les deux casquettes affichées dans le logo.
   * « Architecte » seul est un titre protégé en France (inscription à l'Ordre) :
   * à confirmer — alternative fidèle au diplôme : « Ingénieur en architecture ».
   */
  titles: { dev: 'Développeur', archi: 'Architecte' },
  studio: "elysian studio's",
  city: 'Paris',
  email: 'youcefkouaouci@gmail.com',
  github: 'https://github.com/Youcefkouaouci',
  /** Slug repris du CV de novembre 2026 — à confirmer (un autre profil utilise « youcefkouaouci »). */
  linkedin: 'https://www.linkedin.com/in/youcef-kouaouci',
} as const;

export type Profile = typeof profile;
