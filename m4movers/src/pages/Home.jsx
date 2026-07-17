import Hero from '../components/Hero'
import Stats from '../components/Stats'
import AboutPreview from '../components/AboutPreview'
import ServicesGrid from '../components/ServicesGrid'
import WhyChooseUs from '../components/WhyChooseUs'
import ProcessTimeline from '../components/ProcessTimeline'
import Testimonials from '../components/Testimonials'
import FaqAccordion from '../components/FaqAccordion'
import ContactPreview from '../components/ContactPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ServicesGrid limit={6} />
      <WhyChooseUs />
      <ProcessTimeline />
      <Testimonials />
      <FaqAccordion />
      <ContactPreview />
    </>
  )
}
