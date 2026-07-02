import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Branches from '../sections/Branches'
import LessonPreview from '../sections/LessonPreview'
import Features from '../sections/Features'
import Pricing from '../sections/Pricing'
import CTA from '../sections/CTA'
import Footer from '../sections/Footer'

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Branches />
        <LessonPreview />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
