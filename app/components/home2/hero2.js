"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import SplitText from "../ui/splitText";
import { useI18n } from "@/app/contexts/i18n";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Avatar, Tooltip } from "antd";
import { Keyboard, Navigation, Pagination, Autoplay } from "swiper/modules";
import { useFetch } from "@/app/helper/hooks";
import {
  getAllPublicDestination,
  getAllPublicReviews,
} from "@/app/helper/backend";
import TextWithTooltip from "@/app/helper/utils";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Hero2({ heroData }) {
  const swiperRef = useRef(null);
  const i18n = useI18n();
  const { langCode } = useI18n();
  const [data] = useFetch(getAllPublicDestination, { limit: 6 });
  const [testimonial] = useFetch(getAllPublicReviews, { limit: 10 });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = data?.docs?.[activeIndex]?.banner_image;
  const ACTIVE_W = 220;
  const INACTIVE_W = 220;
  const [currentImage, setCurrentImage] = useState(activeImage);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);

    const timeout = setTimeout(() => {
      setCurrentImage(activeImage);
      setFade(true);
    }, 300); 

    return () => clearTimeout(timeout);
  }, [activeImage]);

  return (
    <div className="relative w-full h-[650px] md:h-[1000px] overflow-hidden -mt-[140px]">
      {activeImage && (
        <Image
        src={currentImage}
        alt="Background"
        fill
        priority
        className={`object-cover transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-80"
        }`}
      />
      )}
      <div className="absolute transition-all duration-500  inset-0 bg-black/50" />

      <div className="travel-container relative z-10">
        <div className="hero-header mt-48 sm:mt-60 xl:w-[1095px] lg:w-[1000px] md:w-[580px] w-full text-white mx-auto text-center">
          <SplitText
            text={heroData?.content?.hero?.title?.[langCode]}
            className="text-center"
            delay={20}
            heighlightsword={[1, 3, 6]}
            heighlightclass={"text-primary"}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-48">
          <div className=" w-full md:w-[30%]  mt-20 flex flex-col justify-start items-start">
            <p className="heading-6 text-white">
              {heroData?.content?.hero?.heading?.[langCode]}
            </p>
            <div className="mt-8 flex items-center gap-4 ">
              <Avatar.Group
                size="large"
                max={{
                  count: 4,
                  style: { color: "#f56a00", backgroundColor: "#fde3cf" },
                }}
              >
                {testimonial?.docs?.map((item) => (
                  <Tooltip
                    key={item._id}
                    title={item.user?.name}
                    placement="top"
                  >
                    <Avatar src={item.user?.image} />
                  </Tooltip>
                ))}
              </Avatar.Group>
              <p className="description-1 text-white">People Joined</p>
            </div>
            <p className="description-1 text-white max-w-[450px] my-6 ">
              {heroData?.content?.hero?.short_description?.[langCode]}
            </p>
            <Link href="/package">
              <div className="hidden lg:flex gap-4 items-center rounded-full">
                <p className="text-base hidden xl:block whitespace-pre font-medium text-white bg-[#EF8248] hover:bg-[#EB662B] px-6 py-[14px] rounded-full">
                  {i18n?.t("Book Now")}
                </p>

                <Link href="/package">
                  <div className="border border-[#E8EAE8] p-3 rounded-full">
                    <MdArrowOutward className="text-2xl text-white" />
                  </div>
                </Link>
              </div>
            </Link>
          </div>
          <div className="w-[1000px] hidden md:flex relative -mr-[650px] -mt-12 sm:mt-12">
            <div className="w-full heroPagination">
              <Swiper
                slidesPerView={3.25}
                spaceBetween={20}
                breakpoints={{
                  320: { slidesPerView: 1.2, spaceBetween: 10 },
                  680: { slidesPerView: 2.2, spaceBetween: 12 },
                  1024: { slidesPerView: 3.25, spaceBetween: 20 },
                }}
                loop={true}
                centeredSlides={false}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                mousewheel={true}
                modules={[Keyboard, Navigation, Pagination, Autoplay]}
                ref={swiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full overflow-visible"
              >
                {data?.docs?.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <SwiperSlide
                      key={index}
                      style={{ width: isActive ? ACTIVE_W : INACTIVE_W }}
                      className={`!w-[${isActive ? ACTIVE_W : INACTIVE_W}px]`}
                    >
                      {/* 🔹 Fix: Set consistent total height */}
                      <div className="flex flex-col w-full mt-10">
                        {/* Image (fixed height for all slides) */}
                        <div className={`relative rounded-[20px] w-full ${isActive ? " absolute -top-10 h-[280px]" : "h-[380px]"}`}>
                          <Image
                            src={item?.banner_image}
                            alt={item?.name || "Destination"}
                            fill
                            className="object-cover !rounded-[20px]"
                            sizes="(max-width: 1024px) 100vw, 420px"
                          />
                        </div>

                        {/* Info section */}
                        <div className="flex-1 w-full p-4 transition-all duration-500 -mt-10">
                          {isActive ? (
                            <>
                              <div className="flex justify-between items-center">
                                <p className="text-white text-lg font-semibold">
                                  {item?.name}
                                </p>
                              </div>

                              <p className="text-white text-sm mt-2">
                                <TextWithTooltip
                                  text={item?.short_description?.[langCode]}
                                  limit={80}
                                />
                              </p>

                              <div className="flex items-center gap-2 mt-2">
                                <FaMapMarkerAlt className="text-white text-sm" />
                                <p className="text-white text-sm">
                                  <TextWithTooltip
                                    text={item?.address?.name}
                                    limit={30}
                                  />
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="h-full" />
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
