/* =====================================================================
   ACTIVITIES — the single place to edit your activities.
   ---------------------------------------------------------------------
   To ADD an activity: copy one { ... } block, paste it at the TOP,
   and edit the fields. The newest date is shown first automatically;
   the 4 most recent show on the page and the rest collapse under
   "Earlier activities".

   Fields:
     date  : "YYYY-MM"            (e.g. "2026-07")
     kind  : "Exhibition" | "Article" | "Competition" | "Product"
     title : one line (quotes are fine inside the back-ticks ` `)
     body  : a list of lines; each becomes a new line in the card
     link  : OPTIONAL — { url: "...", label: "Article Link" }
   ===================================================================== */
window.ACTIVITIES = [
  {
    date: "2026-06",
    kind: "Exhibition",
    title: `An exhibition at ローカルAIに向き合う展示会 vol.2`,
    body: [
      `I exhibited "Improving the Inference Speed and Evaluating Downstream Performance of NexteraBERT, an Original Bidirectional Encoder Model Based on Liquid Time-Constant Modules"`
    ]
  },
  {
    date: "2026-05",
    kind: "Article",
    title: `An article titled "SSE Retrieval MRL v2: Regularization of Representation Space and Performance Improvement via Hyperparameter Optimization"`,
    body: [
      `Abstract:`,
      `Hyperparameter tuning improved representation regularization and performance.`,
      `We achieve a NanoBEIR mean nDCG@10 of 0.503 with just 256 dims, matching previous 1024-dim models while delivering about 4x faster inference.`
    ],
    link: { url: "https://huggingface.co/blog/RikkaBotan/stable-static-embedding-v2-technical-report", label: "Article Link" }
  },
  {
    date: "2026-05",
    kind: "Exhibition",
    title: `An exhibition at 生成AIなんでも展示会 vol.5`,
    body: [
      `I exhibited "NexteraBERT: Rethinking Bidirectional Encoder Models with Liquid Time-Constant Modules, Modern Self-Attention, and Separable Dynamic Tanh normalization"`
    ]
  },
  {
    date: "2026-03",
    kind: "Article",
    title: `An article (almost like an academic paper) titled "SSE (Stable Static Embedding): Unlocking the Potential of Static Embeddings, A Dynamic Tanh Normalization Approach without Speed Penalty"`,
    body: [
      `Abstract:`,
      `This paper proposes SSE, leveraging Separable DyT to enhance static embedding models.`,
      `Achieving retrieval performance with half the parameters, it attains an nDCG@10 score of 0.512 on NanoBEIR.`,
      `By regulating gradient flow and suppressing overfitting, SSE offers a pathway toward faster, more accurate retrieval systems with 16 million parameters.`
    ],
    link: { url: "https://huggingface.co/blog/RikkaBotan/stable-static-embedding-technical-report", label: "Article Link" }
  },
  {
    date: "2026-02",
    kind: "Product",
    title: `Develop SSE: Stable Static Embedding model with the support of GPU computing resources from ローカルAIに向き合う会`,
    body: [
      `I published a lightweight, faster and powerful embedding model (512 dim and 16M parameters). This achives 0.512 on NanoBEIR mean nDCG@10, outperforming ralated studies. SSE adopts Separable Dynamic Tanh Normalization to control gradient flow and improve the generalizability of expressive spaces.`
    ]
  },
  {
    date: "2025-12",
    kind: "Exhibition",
    title: `An exhibition at ローカルAIに向き合う展示会`,
    body: [
      `I exhibited "LTCs: Explanation of convergence and system stability of linear dynamical systems in Liquid Time-Constant networks and applicability of LTCs"`
    ]
  },
  {
    date: "2025-10",
    kind: "Competition",
    title: `Silver Award: Liquid AI Hackathon Series | Tokyo`,
    body: [
      `Our team won the Silver Award in the Liquid AI Hackathon Series held in Tokyo. We developed a vision-language model and application specialized for casual, conversational interactions.`
    ]
  },
  {
    date: "2025-09",
    kind: "Exhibition",
    title: `An exhibition at 生成AIなんでも展示会 Vol.4`,
    body: [
      `I exhibited "Projective Representations and Language Model Construction Based on Duality"`
    ]
  }
];
