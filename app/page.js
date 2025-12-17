import AllTools from "@/components/AllTools";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import MultiSection from "@/components/MultiSection";
import Trending from "@/components/Trending";
import {
  bannerQuery,
  categoriesToolsQuery,
  multiSectionQuery,
  productQuery,
  trendingQuery,
} from "@/lib/Query";
import { sanityClient } from "@/sanity.cli";

export default async function Home() {
  const [
    bannerData,
    multiSectionData,
    categoriesData,
    trendingData,
    productData,
  ] = await Promise.all([
    sanityClient.fetch(bannerQuery),
    sanityClient.fetch(multiSectionQuery),
    sanityClient.fetch(categoriesToolsQuery),
    sanityClient.fetch(trendingQuery),
    sanityClient.fetch(productQuery),
  ]);
  return (
    <>
      <Banner data={bannerData} />
      <MultiSection data={multiSectionData} />
      <Categories data={categoriesData} />
      <Trending data={trendingData} />
      <AllTools data={productData} />
    </>
  );
}
