/* =====================================================================
   Diary entries — the single source of truth for both the list
   (diary.html) and each entry page (diary-entry.html?id=<slug>).
   To add an entry: copy a block, give it a unique "slug", and edit.
   "body" is an array of paragraphs. Sorted by date automatically.
   ===================================================================== */
window.DIARY_ENTRIES = [
  {
    slug: "tuning-nexterabert",
    date: "2026-06-28",
    title: "Tuning NexteraBERT a little further",
    tags: ["research", "NexteraBERT"],
    body: [
      "Spent the afternoon poking at inference speed. A small change to the normalization made the encoder noticeably snappier without hurting accuracy.",
      "Tiny wins like this are what keep me going. I wrote the numbers in my notebook, drew a little star next to them, and made a fresh cup of tea to celebrate."
    ]
  },
  {
    slug: "baked-cheesecake",
    date: "2026-06-15",
    title: "Baked cheesecake for a study break",
    tags: ["baking", "tea"],
    body: [
      "When experiments stall, I bake. Today's baked cheesecake came out perfectly creamy — the top just barely caramelised the way I like it.",
      "I paired a slice with a cup of Earl Grey and read a paper on state space models. A good, gentle day. Sometimes stepping away from the screen is the most productive thing I can do."
    ]
  },
  {
    slug: "representation-spaces",
    date: "2026-05-30",
    title: "Thinking about representation spaces",
    tags: ["research", "notes"],
    body: [
      "Been sketching ideas about how to regularize embedding spaces without slowing things down. Filled a whole notebook page with little diagrams and arrows.",
      "Not sure yet which of these will survive contact with real data — but that uncertainty is my favourite part. It feels like the beginning of something."
    ]
  },
  {
    slug: "pastel-cardigan",
    date: "2026-05-12",
    title: "A new pastel cardigan",
    tags: ["daily"],
    body: [
      "Found the softest lilac cardigan with lace trim. It made my whole week brighter just to look at it hanging by the window.",
      "Sometimes a little frill is exactly the motivation you need before a long training run. Cuteness is a perfectly valid research tool."
    ]
  }
];
