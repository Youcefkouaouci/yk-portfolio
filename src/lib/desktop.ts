import { atom, map } from 'nanostores';

/**
 * Gestionnaire de fenêtres partagé entre les îlots (barre des tâches Vue)
 * et les scripts des fenêtres Astro. Les modules ES étant des singletons
 * dans la page, tout le monde lit et écrit le même store.
 */
export type WindowState = 'open' | 'minimized' | 'maximized' | 'closed';

export const $windows = map<Record<string, WindowState>>({});
export const $active = atom<string | null>(null);
/** Discipline demandée depuis le menu Démarrer — consommée par les filtres (étape 6). */
export const $workFilter = atom<string | null>(null);

export function stateOf(id: string): WindowState {
  return $windows.get()[id] ?? 'open';
}

export function registerWindow(id: string): void {
  if (!$windows.get()[id]) $windows.setKey(id, 'open');
}

export function setWindowState(id: string, state: WindowState): void {
  // Une seule fenêtre agrandie à la fois, comme sous Windows.
  if (state === 'maximized') {
    for (const [other, s] of Object.entries($windows.get())) {
      if (other !== id && s === 'maximized') $windows.setKey(other, 'open');
    }
  }
  $windows.setKey(id, state);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Ramène une fenêtre au premier plan : la restaure si besoin, puis y défile et lui donne le focus. */
export function focusWindow(id: string): void {
  const s = stateOf(id);
  if (s === 'closed' || s === 'minimized') setWindowState(id, 'open');
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    if (stateOf(id) !== 'maximized') {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
    el.focus({ preventScroll: true });
  });
}
