import { projects } from './projects'

export const socials = {
  linkedin: 'https://www.linkedin.com/in/subhranil-das',
  github: 'https://github.com/dassubhranil',
  email: 'dassubhranil1998@gmail.com',
}

export const resumeUrl = '/Subhranil_Das_Data.pdf'

export const siteUrl = 'https://subhranildas.vercel.app'

export const heroStats = [
  { value: 3, suffix: '+', label: 'Years of experience' },
  { value: projects.length, suffix: '', label: 'Featured projects' },
  { value: 4, suffix: '+', label: 'Cloud & data platforms' },
]

export const skills = [
  {
    title: 'Data Pipelines & Orchestration',
    body: 'End-to-end pipelines on Microsoft Fabric, Airflow, and dbt — ingestion, staging, transformation, and validation with automated scheduling, retries, and data-quality gates.',
    icon: 'pipeline',
    span: 2,
  },
  {
    title: 'CRM Data Migration',
    body: 'Enterprise-scale Salesforce → Dynamics 365 migrations with automated schema mapping to Dataverse and 100% data-integrity validation.',
    icon: 'migrate',
    span: 1,
  },
  {
    title: 'Full-Stack Analytics Apps',
    body: 'Production analytics platforms with React + FastAPI on Fabric Lakehouse — dashboards, drill-downs, and executive reporting straight from the gold layer.',
    icon: 'app',
    span: 1,
  },
  {
    title: 'AI & LLM Integration',
    body: 'NL-to-SQL agents with permission-scoped schema access (least-privilege LLM data exposure), AI-generated narrative reports, and OpenAI-powered workflows in production.',
    icon: 'ai',
    span: 2,
  },
  {
    title: 'Cloud & Multi-Tenant Architecture',
    body: 'Azure, AWS, and GCP. Config-driven, multi-tenant systems where every tenant org and user carries independent configuration — no per-engagement rewrites.',
    icon: 'cloud',
    span: 2,
  },
  {
    title: 'Security & Governance',
    body: 'Microsoft Entra SSO, custom RBAC with page-level permissions, audit logging, and governed data access across warehouse and app layers.',
    icon: 'shield',
    span: 1,
  },
]

// All icons are vendored into /public/icons (no third-party CDNs at runtime).
const icon = (name) => `/icons/${name}.svg`

export const toolGroups = [
  {
    label: 'Languages & Query',
    tools: [
      { name: 'Python', icon: icon('python') },
      { name: 'SQL', icon: icon('sql') },
      { name: 'PySpark', icon: icon('pyspark') },
      { name: 'Bash', icon: icon('bash') },
      { name: 'R', icon: icon('r') },
    ],
  },
  {
    label: 'Cloud & Data Platforms',
    tools: [
      { name: 'Microsoft Fabric', icon: icon('microsoft'), fallback: 'Fabric' },
      { name: 'Azure', icon: icon('azure') },
      { name: 'AWS', icon: icon('aws') },
      { name: 'GCP', icon: icon('gcp') },
      { name: 'Databricks', icon: icon('databricks'), fallback: 'DBx' },
      { name: 'Snowflake', icon: icon('snowflake'), fallback: 'SF' },
    ],
  },
  {
    label: 'Engineering & Orchestration',
    tools: [
      { name: 'Airflow', icon: icon('airflow') },
      { name: 'dbt', icon: icon('dbt') },
      { name: 'PostgreSQL', icon: icon('postgresql') },
      { name: 'MySQL', icon: icon('mysql') },
      { name: 'FastAPI', icon: icon('fastapi') },
      { name: 'React', icon: icon('react') },
    ],
  },
  {
    label: 'BI, CRM & AI',
    tools: [
      { name: 'Power BI', icon: icon('powerbi'), fallback: 'PBI' },
      { name: 'Tableau', icon: icon('tableau'), fallback: 'Tab' },
      { name: 'Salesforce', icon: icon('salesforce'), fallback: 'SFDC' },
      { name: 'Dynamics 365', icon: icon('microsoft'), fallback: 'D365' },
      { name: 'OpenAI', icon: icon('openai'), fallback: 'AI' },
      { name: 'Pandas', icon: icon('pandas') },
    ],
  },
  {
    label: 'DevOps & Infra',
    tools: [
      { name: 'Git', icon: icon('git') },
      { name: 'Docker', icon: icon('docker') },
      { name: 'nginx', icon: icon('nginx') },
      { name: 'Azure DevOps', icon: icon('azuredevops') },
      { name: 'GitLab CI/CD', icon: icon('gitlab') },
      { name: 'Jupyter', icon: icon('jupyter') },
    ],
  },
]

export const certifications = [
  {
    name: 'SnowPro Associate: Platform',
    issuer: 'Snowflake',
    issued: 'February 28, 2026',
    expires: 'February 28, 2028',
    credentialId: 'S134094-260228-SOL',
    pdf: '/snowpro-associate-platform.pdf',
  },
]

export const experience = [
  {
    role: 'Software Development Engineer II (Data Engineer)',
    company: 'Gruve AI',
    logo: '/logos/gruve.png',
    period: '12/2025 — Present',
    location: 'Pune, India',
    bullets: [
      'Built a complete Salesforce → Dynamics 365 migration framework on Microsoft Fabric data pipelines — the entire migration is controlled from a UI, with multi-tenant and user-specific configurations so different tenant orgs and users run with independent setups, achieving 100% data integrity through automated schema mapping.',
      'Built Keka Analytics, a full-stack executive analytics platform (React 19 + FastAPI on Microsoft Fabric Lakehouse / OneLake) with Microsoft Entra SSO, custom page-level RBAC, a user-management console, and audit logging — 29 pages, 11 API routers, 26 backend services, Dockerized and deployed via Azure Container Registry behind nginx.',
      'Integrated production AI capabilities: an NL-to-SQL agent whose schema exposure is permission-scoped to each user’s RBAC (least-privilege LLM data access) and AI-generated narrative executive reports via OpenAI.',
      'Designed and maintained end-to-end data pipelines on Microsoft Fabric powering BI dashboards for platform usage, operational metrics, and KPIs; built a configurable sales-commission engine and scheduled background jobs with APScheduler.',
      'Drove cost optimization by identifying inactive enterprise-license users through automated reporting; integrated external SaaS platforms (Glean, Office 365) via API pipelines.',
      'Modeled and optimized analytical datasets in Snowflake for downstream reporting.',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'School of Public Health, Indiana University',
    logo: '/logos/iu.svg',
    period: '01/2024 — 07/2025',
    location: 'Remote, USA',
    bullets: [
      'Designed and orchestrated research data pipelines, standardizing ingestion and transformation for public-health datasets.',
      'Built reproducible analytics workflows and reporting layers supporting faculty research.',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'eGain Corporation',
    logo: '/logos/egain.png',
    logoBg: 'light', // dark wordmark — needs a light backdrop
    period: '06/2021 — 07/2022',
    location: 'Pune, India',
    bullets: [
      'Developed and maintained ETL workflows and analytics datasets supporting customer-engagement products.',
      'Automated data-quality checks and reporting across production data flows.',
    ],
  },
]

export const education = [
  {
    degree: 'M.S. in Data Science',
    school: 'Indiana University Bloomington',
    period: '2022 — 2024',
    detail: 'GPA 3.50 / 4.0',
  },
  {
    degree: 'B.Tech in Applied Electronics & Instrumentation',
    school: 'MAKAUT',
    period: '2017 — 2021',
    detail: 'GPA 8.38 / 10',
  },
]
