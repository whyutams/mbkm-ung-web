'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronUp, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import LogoKM from "@/public/assets/img/kampus-merdeka.png"
import LogoKM2 from "@/public/assets/img/kampus-merdeka-2.png"
import LogoUNG from "@/public/assets/img/ung.png"
import LogoKemen from "@/public/assets/img/kemendikbud.png"

const navLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Tentang Kami', href: '/#tentang-kami' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDisplayMobileMenu, setIsDisplayMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [displayLogo, setDisplayLogo] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
      if (scrolled !== displayLogo) {
        setDisplayLogo(scrolled)
      }

      const scrollPosition = window.scrollY + 100

      navLinks.forEach((link) => {
        const sectionId = link.href === '/' ? 'hero' : link.href.replace('/#', '')
        const element = document.getElementById(sectionId)

        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayLogo])

  useEffect(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => {
        setIsDisplayMobileMenu(isMobileMenuOpen)
      }, 500)
    } else setIsDisplayMobileMenu(isMobileMenuOpen)
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    const targetId = href === '/' ? '#hero' : href.replace('/', '')

    if (targetId.startsWith('#')) {
      const element = document.querySelector(targetId) as HTMLElement
      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80 })
        setActiveSection(targetId.substring(1))
        setIsMobileMenuOpen(false)
      }
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const isActive = (href: string) => {
    const id = href === '/' ? 'hero' : href.substring(2)
    return activeSection === id
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${(isScrolled || isMobileMenuOpen) ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center gap-2">
                <img src={LogoKemen.src} alt="Logo Kemendikbud" className="h-10 w-10" />
                <img src={LogoUNG.src} alt="Logo UNG" className="h-[38px] w-[38px] mr-[2px]" />
                <img src={LogoKM.src} alt="Logo Kampus Merdeka" className={`h-10 ${(displayLogo || isMobileMenuOpen) ? 'hidden' : ''}`} />
                <img src={LogoKM2.src} alt="Logo Kampus Merdeka" className={`h-10 ${(displayLogo || isMobileMenuOpen) ? '' : 'hidden'}`} />
              </div>
            </div>

            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`text-sm font-medium transition-colors relative group ${isActive(link.href)
                      ? isScrolled
                        ? 'text-orange-500'
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-orange-500'
                        : 'text-gray-200 hover:text-white'
                      }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="px-8 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/50"
              >
                Masuk
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${(isScrolled || isMobileMenuOpen) ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : (
                <div>
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 rounded-b-2xl transition-all duration-500 ease-in-out transform origin-top ${isMobileMenuOpen ? 'visible opacity-100 translate-y-0 delay-200' : 'invisible opacity-0 -translate-y-4'}`} >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${isActive(link.href)
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                      }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-200 mt-2 pt-4 px-6 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="text-center py-2 px-6 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  Masuk
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <button id='btn-scroll-up' className={`bg-primary shadow-xl fixed bottom-6 right-6 lg:bottom-8 lg:right-8 p-3 rounded-full z-50 hover:scale-110 hover:brightness-90 transition-all transform ease-in-out ${isScrolled ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-0 pointer-events-none"}`} onClick={scrollToTop} title='Kembali ke atas'>
        <ChevronUp className='w-5 h-5 lg:w-6 lg:h-6 text-white' />
      </button>
    </>
  )
}