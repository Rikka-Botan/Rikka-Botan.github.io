/* =====================================================================
   DIARY — the single place to edit your diary.
   ---------------------------------------------------------------------
   To ADD an entry: copy one { ... } block, paste it at the TOP, and
   edit the fields. The newest date shows first automatically. Each
   entry gets its own page at diary-entry.html?id=<slug>.

   Fields:
     slug   : a unique id for the URL, lowercase-with-dashes (no spaces)
     date   : "YYYY-MM-DD"
     title  : one line
     tags   : a list of short words (shown as #tags)
     body   : a list of paragraphs (each item is one paragraph)
     images : OPTIONAL — a list of photos. Put the picture files in the
              images/diary/ folder, then list them like:
                images: [
                  { src: "images/diary/my-photo.jpg", caption: "A caption" },
                  "images/diary/another.jpg"          // caption is optional
                ]
              The first photo is used as the cover on the diary list.
   ===================================================================== */
window.DIARY_ENTRIES = [
  {
    slug: "yokohama-english-garden-and-disney",
    date: "2026-05-07",
    title: "Yokohama English Garden & Disney",
    tags: ["outing", "roses", "disney"],
    body: [
      "The roses and peonies were in full bloom, and the whole garden was wrapped in the sweetest fragrance.",
      "Afterwards we headed to Disney, where I rode all sorts of roller coasters. Such a fun, happy day!"
    ],
    images: [
      { src: "images/diary/yokohama-english-garden.jpg", caption: "Roses and peonies in full bloom" },
      { src: "images/diary/disney.jpg", caption: "A fun day at Disney" }
    ]
  },
  {
    slug: "a-new-tea-set",
    date: "2026-04-20",
    title: "Welcoming a new tea set",
    tags: ["tea", "teaware"],
    body: [
      "I welcomed a new tea set into my collection — a Narumi set with a beautiful design that looks just like a princess's tiara."
    ],
    images: [
      { src: "images/diary/tea-set.jpg", caption: "My new Narumi tea set" }
    ]
  }
];
