import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { AboutSection } from '@/components/about-section'
import { StatsBand } from '@/components/stats-band'
import { ReelSection } from '@/components/reel-section'
import { WorksSection } from '@/components/works-section'
import { ParallaxBand } from '@/components/parallax-band'
import { ServicesSection } from '@/components/services-section'
import { NewsSection } from '@/components/news-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { quotes } from '@/lib/site-data'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSlider />
        <AboutSection />
        <StatsBand />
        <ReelSection />
        <WorksSection />
        <ParallaxBand image="/images/reel-mixing.png" quote={quotes[1].text} author={quotes[1].author} height="md" />
        <ServicesSection />
        <NewsSection />
        <ParallaxBand image="/images/about-studio.png" quote={quotes[0].text} author={quotes[0].author} height="lg" />
        <ContactSection />
        <ParallaxBand image="/images/hero-studio.png" />
      </main>
      <SiteFooter />
    </div>
  )
}
