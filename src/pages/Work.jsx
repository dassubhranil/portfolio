import WorkSection from '../components/sections/WorkSection'
import usePageMeta from '../hooks/usePageMeta'

export default function Work() {
  usePageMeta({
    title: 'Projects — Subhranil Das',
    description:
      'Featured projects by Subhranil Das — data platforms, CRM-scale migrations, and full-stack analytics products on Microsoft Fabric, Snowflake, and Azure.',
  })
  return (
    <div className="pt-16">
      <WorkSection index="01" />
    </div>
  )
}
