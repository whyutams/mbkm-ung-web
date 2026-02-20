{/* Libs */ }
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
{/* Libs End */ }
{/* Components */ }
import Hero from "./components/sections/Hero"
import BlogPreview from "./components/sections/BlogPreview"
import AboutUs from "./components/sections/AboutUs"
{/* Components End */ }

export default async function Landing() {
  {/* SUPABASE */ }
  const supabase = await createClient();

  {/* General */ }
  const { data: general, error: generalError } = await supabase
    .from("general")
    .select("*")
    .limit(1)
    .maybeSingle();
  const _f = [{ name: "_mbkm_location_name", value: (JSON.parse(general?.data)).mbkm_location_name }];
  const generalSetting = JSON.parse(_f.map(_ => general?.data?.replaceAll(`{${_.name}}`, _.value))[0]);
  if (generalError) console.log("Error fetch general:", generalError.message);
  {/* General End */ }

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
      <main>
        <Hero postsCount={posts?.length || 0} profilesCount={profiles?.length || 0} generalSetting={generalSetting || {}} />
        <BlogPreview posts={posts?.slice(0, 5) || []} />
        <AboutUs profiles={profiles || []} generalSetting={generalSetting || {}} />
      </main>
    </>
  )
}