{/* Libs */ }
import { createClient } from "@/utils/supabase/server";
{/* Libs End */ }
{/* Components */ }
import Header from "./components/Header"
import Hero from "./components/sections/Hero"
import BlogPreview from "./components/sections/BlogPreview"
import AboutUs from "./components/sections/AboutUs"
import Footer from "./components/Footer"
{/* Components End */ }

export default async function HomePage() {
  {/* SUPABASE */ }
  const supabase = await createClient();

  {/* General */ }
  const { data: general, error: generalError } = await supabase
    .from("general")
    .select("*")

  if (generalError) console.log("Error fetch general:", generalError.message);
  {/* General End */ }

  {/* Viewers */ }
  const { data: viewers, error: viewersError } = await supabase
    .from("viewers")
    .select("*")

  if (viewersError) console.log("Error fetch viewers:", viewersError.message);
  {/* Viewers End */ }

  {/* Posts */ }
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(`
      *,
      created_by (
        full_name,
        username,
        avatar_url,
        nim
      ),
      updated_by (
        full_name,
        username,
        avatar_url,
        nim
      )
      `)
      .eq('is_published', true)
      .order("created_at", { ascending: false })

  if (postsError) console.log("Error fetch posts:", postsError.message);
  {/* Posts End */ }

  {/* Profiles */ }
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")

  if (profilesError) console.log("Error fetch profiles:", profilesError.message);
  {/* Profiles End */ }
  {/* SUPABASE END */ }

  return (
    <>
      <Header />
      <main>
        <Hero postsCount={posts?.length || 0} profilesCount={profiles?.length || 0} />
        <BlogPreview posts={posts?.slice(0, 5) || []} />
        <AboutUs profiles={profiles || []} />
      </main>
      <Footer viewers={viewers?.filter(x => x?.post_id === null) || []} />
    </>
  )
}