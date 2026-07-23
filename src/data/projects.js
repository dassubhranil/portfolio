// All case studies, rendered by pages/CaseStudy.jsx. Order = display order.
export const projects = [
  {
    slug: 'salesforce-d365-migration',
    title: 'Salesforce → Dynamics 365 Migration Utility',
    proprietary: true,
    banner: 'migrate',
    blurb:
      'Config-driven migration framework on Microsoft Fabric that moves complete Salesforce orgs into Dynamics 365 through a UI — multi-tenant, user-scoped configs, 100% data integrity via automated schema mapping.',
    tags: ['Microsoft Fabric', 'Salesforce', 'Dynamics 365', 'Data Migration'],
    kpis: [
      { label: 'Domain', value: 'Enterprise CRM Migration' },
      { label: 'Data Integrity', value: '100%', countTo: 100, suffix: '%' },
      { label: 'Tenancy', value: 'Multi-tenant · user-scoped' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Migrating a CRM is one of the riskiest data projects an enterprise takes on: every account, contact, opportunity, and custom object has to arrive intact, related, and usable on day one. This utility turns that into a **repeatable, UI-driven process** — a complete framework that migrates entire Salesforce orgs into Dynamics 365 using **Microsoft Fabric data pipelines**, with no hand-written scripts per engagement.',
          'The entire migration is controlled from a web UI: connection setup, object selection, mapping review, execution, and validation — designed so a delivery team can run a full migration without touching pipeline code.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          '**Fabric data pipelines** drive the full lifecycle — extraction from the Salesforce API, staging, transformation, and load into Dynamics 365 / Dataverse.',
          '**Automated schema mapping** translates Salesforce objects and fields into Dataverse entities, with override points for custom objects and bespoke field mappings.',
          '**Multi-tenant by design** — each tenant organization holds its own isolated configuration (connections, object scope, mapping overrides), and configuration is further scoped per user, so different orgs and different users run entirely independent migration setups side by side.',
          'Orchestration layers handle **sequencing, retries, and dependency ordering** between related objects; validation stages verify record counts and relationship integrity at every step.',
        ],
      },
      {
        heading: 'Results',
        bullets: [
          '**100% data integrity** across migrated objects, verified through automated schema mapping and post-load validation.',
          'Migrations became **self-service and repeatable** — the same framework serves multiple tenant orgs with zero per-engagement pipeline rewrites.',
          'Drastically reduced manual migration effort and eliminated whole classes of mapping errors.',
        ],
      },
    ],
    confidential: true,
  },
  {
    slug: 'keka-analytics',
    title: 'Keka Analytics — Executive Portfolio Dashboard',
    proprietary: true,
    banner: 'dashboard',
    blurb:
      'Full-stack executive analytics platform — React 19 + FastAPI on a Microsoft Fabric Lakehouse, with Entra SSO, custom RBAC, a permission-scoped NL-to-SQL AI agent, and AI-generated narrative reports.',
    tags: ['React', 'FastAPI', 'Fabric Lakehouse', 'Entra SSO', 'OpenAI'],
    kpis: [
      { label: 'Frontend', value: '29 pages', countTo: 29, suffix: ' pages' },
      { label: 'Backend', value: '26 services', countTo: 26, suffix: ' services' },
      { label: 'API routers', value: '11 routers', countTo: 11, suffix: ' routers' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A full-stack analytics product built for weekly CEO/COO/CFO portfolio reviews: portfolio performance, project profitability, delivery and compliance, billing, sales commissions, and utilization — all served live from a **Microsoft Fabric Lakehouse** gold layer rather than static decks.',
          'It behaves like an internal SaaS product: governed access, role-aware pages, scheduled refreshes, and AI assistance for both querying and reporting.',
        ],
      },
      {
        heading: 'Architecture',
        bullets: [
          '**React 19 + Vite SPA** with page-level, permission-gated routes; **FastAPI** backend organized into 11 routers and 26 service modules; data plane on **Fabric Lakehouse SQL endpoints + OneLake** file storage.',
          '**Scheduled background jobs** (APScheduler) for pipeline runs and notifications; in-app notification system; multi-connection management for switching Fabric SQL endpoints.',
          '**Containerized end to end** — Docker images shipped through Azure Container Registry and served behind nginx.',
        ],
      },
      {
        heading: 'Security & Governance',
        bullets: [
          '**Microsoft Entra (Azure AD) SSO** with JWT sessions and idle-timeout handling.',
          '**Custom RBAC layer**: page-level permissions drive both route guards in the SPA and `require_permission` dependencies on every API endpoint.',
          'A **user-management admin console** and a full **audit log** of sensitive actions.',
        ],
      },
      {
        heading: 'AI Capabilities',
        bullets: [
          '**NL-to-SQL agent**: users ask questions in plain English; the backend constructs a schema prompt containing **only the tables the user’s RBAC unlocks** (least-privilege LLM data access), generates SQL via OpenAI, validates identifiers, and returns results.',
          '**AI narrative reports**: project financials are gathered and turned into executive-ready written narratives, powering a weekly-reports module.',
        ],
      },
      {
        heading: 'Selected Features',
        bullets: [
          'A configurable **sales-commission engine** with commission plans and reconciliation.',
          'Drill-down profitability, projects-at-risk, utilization, and compliance dashboards; manager and team directories; timesheets, rate cards, and invoice detail views.',
          'Client-side chart and report export, theming, and rate-limited APIs.',
        ],
      },
    ],
    confidential: true,
  },
  {
    slug: 'generative-ai-pathology',
    title: 'Generative AI for Pathology Datasets',
    banner: null,
    image: '/Real.jpg',
    imageSize: [900, 900],
    blurb:
      'Synthesizing privacy-preserving pathology image data with StyleGAN3 and boosting nuclei-detection models — +40% relative mAP improvement at 85% detection accuracy.',
    tags: ['StyleGAN3', 'YOLOv8', 'PyTorch', 'Medical Imaging'],
    repo: 'https://github.com/dassubhranil/Generative-AI-for-Pathology-Datasets',
    kpis: [
      { label: 'mAP improvement', value: '+40% relative', countTo: 40, prefix: '+', suffix: '%' },
      { label: 'Detection accuracy', value: '85%', countTo: 85, suffix: '%' },
      { label: 'FID (StyleGAN3)', value: '~18', countTo: 18, prefix: '~' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Histopathology datasets are sensitive and hard to share. This research project investigates whether state-of-the-art generative models can produce **synthetic datasets that retain biological signal** and are useful for downstream tasks like nuclei detection — enabling collaboration without exposing patient data.',
        ],
        goals: [
          'Create high-fidelity synthetic pathology images preserving key biological features.',
          'Train detection models on synthetic data and measure transfer to real data.',
          'Ship open-source tooling and reproducible pipelines.',
        ],
      },
      {
        heading: 'Methods',
        bullets: [
          '**Data preparation**: standardized staining and tile sizes; nuclei masks via semi-automated segmentation (watershed + U-Net prototypes) with expert correction.',
          '**Generative models**: DCGAN and VAE baselines; **StyleGAN3** produced the highest-fidelity patches, with style mixing to vary staining and scanner characteristics.',
          '**Downstream**: YOLOv8 nuclei detector trained with a synthetic-pretrain → small-real-fine-tune schedule, mixed precision, and curriculum learning.',
          '**Evaluation**: detection mAP on real test sets, FID for visual fidelity, and biological feature agreement (nucleus size/intensity/texture distributions, KS tests).',
        ],
      },
      {
        heading: 'Results',
        bullets: [
          '**+40% relative mAP** when training with synthetic + real vs real-only (controlled experiment).',
          '**85% detection accuracy** on the real test set for the best model.',
          '**FID ≈ 18** for StyleGAN3 patches; removing style mixing cost ~9% downstream mAP in ablations.',
          'Privacy checks: nearest-neighbor searches in deep feature space and pathologist review ensured no memorized patient patches.',
        ],
        images: [
          { src: '/Real.jpg', size: [900, 900], caption: 'Real pathology patches' },
          { src: '/Synthetic.jpg', size: [900, 900], caption: 'StyleGAN3 synthetic patches' },
        ],
      },
    ],
  },
  {
    slug: 'retail-insights',
    title: 'Turbocharging Retail Insights',
    banner: null,
    image: '/dBT.jpg',
    imageSize: [1024, 427],
    coverFrame: true,
    blurb:
      'End-to-end e-commerce data pipeline on Apache Airflow and GCP — automated ingestion into BigQuery, Soda data-quality gates, dbt transformations, and Metabase dashboards.',
    tags: ['Airflow', 'BigQuery', 'dbt', 'Soda', 'Metabase'],
    repo: 'https://github.com/dassubhranil/Turbocharging-Retail-Insights',
    kpis: [
      { label: 'Orchestration', value: 'Airflow (Astro Runtime)' },
      { label: 'Warehouse', value: 'BigQuery' },
      { label: 'Quality gates', value: 'Soda Core in-DAG' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A production-style data pipeline for online retail: automated ingestion from GCS into **BigQuery**, data-quality enforcement with **Soda** checks embedded as DAG tasks, modular **dbt** transformations, and **Metabase** dashboards for product, marketing, and operations teams.',
        ],
      },
      {
        heading: 'Pipeline Design',
        bullets: [
          '**Automated data flow**: Airflow sensors and transfer operators move data from GCP buckets into BigQuery on schedule.',
          '**Quality assurance**: Soda checks validate schema, row counts, null rates, and custom business rules before data progresses.',
          '**Transformations**: incremental dbt models with tests and documentation, leveraging BigQuery for performance.',
          '**Insights**: Metabase dashboards deliver product funnels, inventory alerts, and cohort analyses.',
        ],
      },
      {
        heading: 'Stack Notes',
        bullets: [
          'Astro CLI + Astro Runtime 8.8.0 for the Airflow environment.',
          'soda-core-bigquery 3.0.45 and dbt-bigquery 1.5.3 pinned for reproducibility.',
        ],
      },
    ],
  },
  {
    slug: 'commentary-analytics',
    title: 'Dynamic Commentary Analytics',
    banner: null,
    image: '/output.jpg',
    imageSize: [1400, 743],
    coverFrame: true,
    blurb:
      'NLP analysis of esports commentary — audio processing, AI transcription, and VADER sentiment timelines revealing how commentators craft narratives around in-game events.',
    tags: ['YouTube API', 'Pydub', 'OpenAI', 'NLTK', 'Plotly'],
    repo: 'https://github.com/dassubhranil/Dynamic-Commentary',
    kpis: [
      { label: 'Pipeline', value: 'Audio → Transcript → Sentiment' },
      { label: 'NLP', value: 'NLTK · VADER' },
      { label: 'Visualization', value: 'Plotly timelines' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'Esports commentators blend play-by-play with narrative framing — comeback arcs, "David vs Goliath" storylines. This project tests whether those rhetorical and tonal patterns are consistent and correlated with in-game events, by combining audio processing, AI transcription, and NLP sentiment analysis.',
        ],
      },
      {
        heading: 'Process',
        bullets: [
          '**Acquisition**: fetch match VoDs and metadata via the YouTube API / yt-dlp.',
          '**Audio processing**: Pydub normalizes audio and splits it into 60-second chunks for reliable transcription.',
          '**Transcription**: chunks are transcribed via OpenAI speech APIs, then cleaned and merged across boundaries.',
          '**Sentiment**: NLTK VADER scores per chunk and per entity (team/player mentions), aligned with in-game events like kills and objectives.',
          '**Visualization**: synchronized Plotly timelines — game events, commentator sentiment, and audience chat sentiment — with annotated narrative moments.',
        ],
      },
      {
        heading: 'Why It Matters',
        bullets: [
          'Reveals the storytelling patterns that drive viewer engagement and dramatic pacing.',
          'Helps broadcasters coach commentators with data.',
          'Enables sentiment-aware highlight detection for clips and marketing.',
        ],
      },
    ],
  },
  {
    slug: 'heart-disease-prediction',
    title: 'Heart Disease Prediction App',
    banner: null,
    image: '/hda.jpg',
    imageSize: [1400, 625],
    coverFrame: true,
    blurb:
      'Interactive Streamlit app predicting heart-disease risk with XGBoost and explaining every prediction through SHAP waterfalls — deployed live.',
    tags: ['Streamlit', 'XGBoost', 'SHAP'],
    repo: 'https://github.com/dassubhranil/Heart-Disease-App',
    demo: 'https://heart-disease-app-subhranildas.streamlit.app/',
    kpis: [
      { label: 'Model', value: 'XGBoost classifier' },
      { label: 'Explainability', value: 'SHAP TreeExplainer' },
      { label: 'Interface', value: 'Streamlit · live demo' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'A quick, transparent heart-disease risk assessment: users enter 13 clinical features (age, chest-pain type, blood pressure, cholesterol…) and get a real-time risk classification with probability — plus a **SHAP explanation of exactly which factors drove the prediction**.',
        ],
      },
      {
        heading: 'How It Works',
        bullets: [
          'XGBoost classifier trained on the Cleveland heart dataset (303 rows, 13 features).',
          'SHAP TreeExplainer renders per-prediction waterfall and summary plots.',
          'Personalized recommendations derived from each user’s top SHAP drivers.',
          'Responsive Streamlit UI with validation, edge-case handling, and caching.',
        ],
      },
      {
        heading: 'Notes',
        body: [
          'This is a research/demo tool, not a medical device — it is not a replacement for clinical judgement.',
        ],
      },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
