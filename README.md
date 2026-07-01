# Rikka Botan | Portfolio

A static, pastel-themed personal portfolio for Rikka Botan (Japanese independent
researcher in language-model architecture). Plain HTML/CSS/JS — no build step.

## Pages

`index` (Home) · `about` · `diary` · `projects` · `articles` (Qiita API) ·
`repositories` (GitHub API) · `models` (Hugging Face API) · `activities` · `contact`

## Structure

| File | Purpose |
|------|---------|
| `*.html` | One page each (`<main>` content only; shared UI is injected) |
| `style.css` | All styling (design tokens, sidebar layout, effects) |
| `layout.js` | Injects the sidebar, mobile drawer, pager & footer (edit `PAGES` to change nav) |
| `script.js` | Interactions: reveal, page fade, prefetch, scroll bar, cursor glow, tilt, magnetic buttons |
| `intro.js` | One-time star intro on the home page |
| `slider.js` | About-page photo slider |
| `diary.js` | Diary entries (edit the `ENTRIES` array to add a post) |
| `articles.js` / `repositories.js` / `models.js` | Live data from Qiita / GitHub / Hugging Face |
| `activities.js` | Sorts the static activity cards |

## Run locally

Any static server works, e.g.:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

(Open via a server rather than `file://` so the live API sections load.)

## Publish on GitHub Pages

This repo is a **user site**, so it publishes from the default branch root:

1. Create a GitHub repo named exactly `Rikka-Botan.github.io`.
2. Push this folder to its `main` branch.
3. In **Settings → Pages**, set *Source* to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. The site goes live at `https://rikka-botan.github.io/`.

The `.nojekyll` file tells Pages to serve all files as-is (no Jekyll processing).
