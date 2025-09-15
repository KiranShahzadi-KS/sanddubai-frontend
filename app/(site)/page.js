/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Expert1 from "../components/home1/expert1";
import { useFetch } from "../helper/hooks";
import { fetchPageContentTheme1, fetchPublicSettings } from "../helper/backend";
import { useEffect } from "react";
import Newsletter from "../components/home1/newsletter";
import Hero from "../components/home1/hero";
import OffersSection from "../components/home1/specialOffers";
import Choose from "../components/home1/choose";
import VisaService from "../components/home1/visaService";
import WhoWeAre from "../components/home1/whoWe";
import Package from "../components/home1/package";
import PopularDestination from "../components/home1/popularDestination";
import Testimonials from "../components/home1/testimonials";
import Blog1 from "../components/home1/blog1";
import Partner from "../components/home1/partner";
import ProductSection from "../components/home1/productSection";
import Hero2 from "../components/home2/hero2";
import PopularDestination2 from "../components/home2/popularDestination2";
import Choose2 from "../components/home2/choose2";
import VisaService2 from "../components/home2/visaService2";
import WhoWeAre2 from "../components/home2/whoWe2";
import MainLoader, { Loader } from "../(dashboard)/components/common/loader";

export default function Home() {
  const [data, getData, { loading }] = useFetch(fetchPageContentTheme1, {
    status: true,
  });
  const [dataProduct] = useFetch(fetchPublicSettings);
  const isProduct = dataProduct?.is_product_module;
  useEffect(() => {
    getData();
  }, []);
  const theme = data?.theme;

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="flex flex-col">
      <>
        {
          theme === 'one' &&
          <main className="flex flex-col 2xl:gap-[150px] xl:gap-[120px] md:gap-20 gap-10">
            <Hero data={data} />
            <div className="flex flex-col xl:gap-[120px] md:gap-20 gap-10 overflow-hidden">
              <OffersSection theme={theme} />
              <Partner />
              <PopularDestination />
              <WhoWeAre theme={theme} />
              <Package theme={theme} />
              <VisaService />
              <Choose />
              <Testimonials theme={theme} />
              <Expert1 theme={theme} />
              {isProduct && <ProductSection theme={theme} />}
              <Blog1 theme={theme} />
              <Newsletter theme={theme} />
            </div>
          </main>
        }
        {
          theme === 'two' &&
          <main className="flex flex-col 2xl:gap-[150px] xl:gap-[120px] md:gap-20 gap-10">
            <Hero2 heroData={data} />
            <div className="flex flex-col xl:gap-[120px] md:gap-20 gap-10 overflow-hidden">
              <OffersSection theme={theme} />
              <PopularDestination2 />
              <WhoWeAre2 theme={theme} />
              <VisaService2 />
              <Package theme={theme} />
              <Choose2 />
              <Testimonials theme={theme} />
              <Expert1 theme={theme} />
              {isProduct && <ProductSection theme={theme} />}
              <Blog1 theme={theme} />
              <Newsletter theme={theme} />
            </div>
          </main>
        }
      </>
    </main>
  );
}
