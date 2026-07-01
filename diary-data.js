/* =====================================================================
   DIARY — the single place to edit your diary.
   ---------------------------------------------------------------------
   To ADD an entry: copy one { ... } block, paste it at the TOP, and
   edit the fields. The newest date shows first automatically. Each
   entry gets its own page at diary-entry.html?id=<slug>.

   Fields:
     slug  : a unique id for the URL, lowercase-with-dashes (no spaces)
     date  : "YYYY-MM-DD"
     title : one line
     tags  : a list of short words (shown as #tags)
     body  : a list of paragraphs (each item is one paragraph)
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
    ]
  },
  {
    slug: "a-new-tea-set",
    date: "2026-04-20",
    title: "Welcoming a new tea set",
    tags: ["tea", "teaware"],
    body: [
      "I welcomed a new tea set into my collection — a Narumi set with a beautiful design that looks just like a princess's tiara."
    ]
  }
];
