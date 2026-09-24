import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ResponsiveShowcase from './components/ResponsiveShowcase'
import Services from './components/Services'
import DevelopmentProcess from './components/DevelopmentProcess'
import ResumeCTA from './components/ResumeCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/ui/BackToTop'
import MusicToggle from './components/ui/MusicToggle'
import ScrollProgress from './components/ui/ScrollProgress'
import TechMarquee from './components/ui/TechMarquee'
import { CursorGlow } from './components/ui/Motion'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ResponsiveShowcase />
        <Services />
        <DevelopmentProcess />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
      <MusicToggle />
      <BackToTop />
    </>
  )
}
