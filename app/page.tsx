{/* Components */}
import Header from "./components/Header"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import ProjectsPreview from "./components/sections/ProjectsPreview"
import BlogPreview from "./components/sections/BlogPreview"
import MembersPreview from "./components/sections/MembersPreview"
import Footer from "./components/Footer"
{/* Components End */}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <About /> */}
        {/* <ProjectsPreview /> */}
        <BlogPreview />
        <MembersPreview />
      </main>
      <Footer />
    </>
  )
}