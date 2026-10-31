import SkillsSection from '../components/sections/SkillsSection'
import usePageMeta from '../hooks/usePageMeta'

export default function Skills() {
  usePageMeta({
    title: 'Skills — Subhranil Das',
    description:
      'What Subhranil Das builds — data pipelines, CRM migration, full-stack analytics apps, AI/LLM integration, cloud architecture, and data governance — and the tools behind them.',
  })
  return (
    <div className="pt-16">
      <SkillsSection index="01" />
    </div>
  )
}
