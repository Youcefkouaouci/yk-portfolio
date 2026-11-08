# youcef.os — portfolio de Youcef Kouaouci

Portfolio développeur full stack × architecture, présenté comme un bureau : chaque section est une fenêtre (`currently.log`, `about_me.txt`, `services.dwg`, `realisations\`, `dashboard.exe`, `cv.pdf`) pilotée par une barre des tâches façon Windows 11.

## Stack

- **Astro** — site statique, contenus en Markdown (projets à venir dans `src/content/`)
- **Vue 3** — îlots interactifs uniquement (barre des tâches, filtres, dashboard)
- **Tailwind CSS 4** — tokens de design dans `src/styles/global.css`
- **nanostores** — état partagé entre îlots (fenêtres, thème)
- **GSAP** — animations du logo et de la galerie (étapes suivantes)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # sortie statique dans dist/
```

## Où modifier quoi

| Quoi | Où |
| --- | --- |
| Nom, titres, liens, e-mail | `src/data/profile.ts` |
| Liste et ordre des fenêtres | `src/data/windows.ts` |
| Couleurs des rendus V1 Blueprint / V2 Calque | `src/styles/global.css` (bloc Tokens) |
| Contenu des sections | `src/pages/index.astro` |

## Système de design

Règle de la dualité, partout : **teal / cyan = développement**, **jaune / ambre = architecture**.
Deux rendus : **V2 Calque** (clair, papier sauge, défaut) et **V1 Blueprint** (sombre), au choix dans le pied de page ou la barre des tâches.
