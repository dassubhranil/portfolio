import ContactSection from '../components/sections/ContactSection'
import usePageMeta from '../hooks/usePageMeta'

export default function Contact() {
  usePageMeta({
    title: 'Contact — Subhranil Das',
    description:
      'Get in touch with Subhranil Das — data-platform builds, migrations, and full-stack analytics products. Reach out via the form, email, or LinkedIn.',
  })
  return (
    <div className="pt-16">
      <ContactSection index="01" />
    </div>
  )
}
