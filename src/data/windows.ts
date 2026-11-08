import type { IconName } from '../lib/icons';

/**
 * Chaque section du portfolio est une « fenêtre » du bureau youcef.os.
 * L'extension du nom de fichier dit de quel côté penche la section :
 * accent « dev » (teal/cyan), « archi » (jaune/ambre) ou neutre.
 */
export interface DesktopWindow {
  id: string;
  file: string;
  label: string;
  icon: IconName;
  accent: 'dev' | 'archi' | 'neutral';
  folder?: boolean;
}

export const windows: DesktopWindow[] = [
  { id: 'currently', file: 'currently.log', label: 'Currently', icon: 'activity', accent: 'dev' },
  { id: 'about', file: 'about_me.txt', label: 'À propos', icon: 'user-round', accent: 'neutral' },
  { id: 'services', file: 'services.dwg', label: 'Services', icon: 'drafting-compass', accent: 'archi' },
  { id: 'realisations', file: 'realisations', label: 'Réalisations', icon: 'folder-open', accent: 'neutral', folder: true },
  { id: 'dashboard', file: 'dashboard.exe', label: 'Dashboard', icon: 'gauge', accent: 'dev' },
  { id: 'cv', file: 'cv.pdf', label: 'CV', icon: 'file-text', accent: 'neutral' },
];

export const ADDRESS_ROOT = 'C:\\Users\\youcef\\';

export function addressOf(w: Pick<DesktopWindow, 'file' | 'folder'>): string {
  return ADDRESS_ROOT + w.file + (w.folder ? '\\' : '');
}

/** Disciplines du menu Démarrer — elles piloteront les filtres de la galerie (étape 6). */
export const disciplines = [
  { id: 'dev', label: 'Développement', accent: 'dev' },
  { id: 'architecture', label: 'Architecture', accent: 'archi' },
  { id: 'recherche', label: 'Recherche', accent: 'archi' },
  { id: 'graphisme', label: 'Graphisme et illustration', accent: 'neutral' },
] as const;
