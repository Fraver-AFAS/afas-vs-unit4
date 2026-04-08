# AFAS vs Unit4 presentatie

Deze repository bevat een statische presentatie-website voor de interne vergelijking tussen AFAS Software en Unit4.

## Live versie
- GitHub Pages: https://fraver-afas.github.io/afas-vs-unit4/

## Tech stack
- HTML5 (`index.html`)
- Vanilla JavaScript (`script.js`)
- SASS (SCSS partials in `scss/`)
- Gecompileerde output: `styles.css`

## Projectstructuur
- `index.html`: inhoud, semantische secties en slide-opbouw
- `script.js`: navigatie, actieve slide-indicatie, presenter mode
- `scss/main.scss`: entrypoint dat alle partials importeert
- `scss/_tokens.scss`: design tokens (kleuren, radii, spacing)
- `scss/_layout.scss`: deck/slide-layout en animaties
- `scss/_navigation.scss`: zijbalk, indicator en jump-button
- `scss/_cards.scss`, `scss/_badges.scss`, `scss/_typography.scss`: componentstijlen
- `scss/_slide-*.scss`: slide-specifieke styles per sectie
- `scss/_responsive.scss`: responsive en reduced-motion regels
- `styles.css`: gecompileerde CSS voor productie

## Lokale ontwikkeling
1. Installeer dependencies:
	- `npm install`
2. Start watch mode:
	- `npm run watch`
3. Open `index.html` in de browser.

## Build
- Productiebuild:
  - `npm run build`

Dit compileert `scss/main.scss` naar `styles.css` (compressed, zonder source map).

## Publicatie (GitHub Pages)
De site publiceert vanaf:
- Branch: `main`
- Folder: `/` (repository root)

Na wijzigingen:
1. Commit en push naar `main`
2. GitHub Pages bouwt automatisch opnieuw

## Repository hygiene
- `node_modules/` en `package-lock.json` worden niet meegecommit
- Dit is afgevangen via `.gitignore`
