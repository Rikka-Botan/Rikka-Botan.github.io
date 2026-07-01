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
| `script.js` | Interactions: scroll reveal, page-transition loader, prefetch, scroll-progress, snow/stars |
| `intro.js` | One-time star intro on the home page |
| `slider.js` | About-page photo slider |
| **`diary-data.js`** | **Diary entries — edit this to add/change diary posts** |
| `diary.js` / `diary-entry.js` | Render the diary list and each entry page |
| **`activities-data.js`** | **Activities — edit this to add/change activities** |
| `activities.js` | Renders the activities from that data |
| `articles.js` / `repositories.js` / `models.js` | Live data from Qiita / GitHub / Hugging Face |

## Updating Diary & Activities

Both are edited the same way — open one **data file** and add a block to the
top of the list. No HTML needed; the pages rebuild themselves.

**Add a diary post** → edit `diary-data.js`:

```js
{
  slug: "my-new-post",          // unique id, lowercase-with-dashes
  date: "2026-07-10",
  title: "A short title",
  tags: ["research", "daily"],
  body: [
    "First paragraph.",
    "Second paragraph."
  ],
  images: [                     // optional — put files in images/diary/
    { src: "images/diary/photo1.jpg", caption: "A caption" },
    "images/diary/photo2.jpg"   // caption is optional
  ]
},
```

**Photos**: drop the image files into the `images/diary/` folder and list
them in `images`. The first photo becomes the cover on the diary list, and
all photos appear as a gallery on the entry page. (The `images/diary/*.jpg`
files currently there are pastel placeholders — replace them with real
photos, keeping the same file names, or point `src` at your own files.)

**Add an activity** → edit `activities-data.js`:

```js
{
  date: "2026-07",
  kind: "Exhibition",           // Exhibition | Article | Competition | Product
  title: "What I did",
  body: ["A sentence describing it."],
  link: { url: "https://...", label: "Article Link" }   // optional
},
```

Newest dates show first automatically; older items collapse under a
"more" toggle. Save the file and refresh — that's it.

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
