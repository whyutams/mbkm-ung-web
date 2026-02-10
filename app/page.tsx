{/* Components */}
import Header from "./components/Header"
import Hero from "./components/sections/Hero"
import BlogPreview from "./components/sections/BlogPreview"
import AboutUs from "./components/sections/AboutUs"
import Footer from "./components/Footer"
{/* Components End */}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero /> 
        <BlogPreview />
        <AboutUs />
      </main>
      <Footer />
    </>
  )
}