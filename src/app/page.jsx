import FeaturedRemedies from "@/components/Page/Home/FeaturedRemedies";
import Hero from "@/components/Page/Home/Hero";
import ProductCategories from "@/components/Page/Home/ProductCategories";
import PromoBanner from "@/components/Page/Home/PromoBanner";
import Testimonials from "@/components/Page/Home/Testimonials";

export default function Home() {
  return (
    <div className=" mt-5 bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <FeaturedRemedies/>
      <ProductCategories/>
      <Testimonials/>
      <PromoBanner/>
    </div>
  );
}
