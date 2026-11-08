import { atom } from 'nanostores';
import { prefersReducedMotion } from './desktop';

/**
 * Deux rendus du site :
 * - « calque »    (version 2, colorée)  : papier sauge, teal + jaune — défaut
 * - « blueprint » (version 1, sombre)   : ardoise, cyan + ambre (DESIGN.md « Fluent Blueprint »)
 */
export type Theme = 'calque' | 'blueprint';
export const THEME_KEY = 'yk-theme';
const META_COLORS: Record<Theme, string> = { calque: '#E4ECE9', blueprint: '#0D1013' };

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'calque';
  return document.documentElement.dataset.theme === 'blueprint' ? 'blueprint' : 'calque';
}

export const $theme = atom<Theme>(readInitial());

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* stockage indisponible (navigation privée) : le thème reste valable pour la page */
  }
}

if (typeof document !== 'undefined') {
  $theme.listen((theme) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !prefersReducedMotion()) doc.startViewTransition(() => apply(theme));
    else apply(theme);
  });
}

export function setTheme(theme: Theme): void {
  if ($theme.get() !== theme) $theme.set(theme);
}

export function toggleTheme(): void {
  setTheme($theme.get() === 'blueprint' ? 'calque' : 'blueprint');
}
