import { Hero, Journey, Services, Testimonials, Treatments, Videos } from "@/components/sections";
import { getTestimonials, getVideos } from "@/lib/content";

export default async function Home() {
  const [testimonials, videos] = await Promise.all([getTestimonials(), getVideos()]);

  return (
    <>
      <Hero />
      <Journey />
      <Treatments />
      <Services />
      <Videos videos={videos} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
