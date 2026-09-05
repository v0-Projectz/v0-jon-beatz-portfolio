import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { AboutSection } from '@/components/about-section'
import { ReelSection } from '@/components/reel-section'
import { WorksSection } from '@/components/works-section'
import { ServicesSection } from '@/components/services-section'
import { NewsSection } from '@/components/news-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSlider />
        <AboutSection />
        <ReelSection />
        <WorksSection />
        <ServicesSection />
        <NewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
