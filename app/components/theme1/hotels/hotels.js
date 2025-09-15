
"use client";
import { Drawer, Empty } from "antd";
import { useEffect, useState } from "react";
import Banner from "@/app/components/site/common/component/Banner";
import React from "react";
import { useI18n } from "@/app/contexts/i18n";
import Image from "next/image";
import HotelFilters from "../../common/hotelFilters";
import HotelCard from "../../site/common/card/hotelCard";
import { useFetch } from "@/app/helper/hooks";
import { getAllPublicHotel } from "@/app/helper/backend";
import Banner2 from "../../site/common/component/Banner2";

const HotelsPage = ({ destination, hotelType, roomType, reputation, theme }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, getData] = useFetch(getAllPublicHotel, { limit: 100 }, false);

  useEffect(() => {
    getData({
      destination: destination,
      hotel_type: hotelType,
      room_type: roomType,
      star: reputation,
    });
  }, [destination, hotelType, roomType, reputation]);

  const i18n = useI18n();
  return (
    <div className="">
      {
        theme === 'one' ?
          <Banner title="Hotels" /> :
          <Banner2 title="Hotels" />
      }
      <div className="travel-container xl:mt-[106px] lg:mt-[90px] md:mt-20 xm:mt-16 mt-12 relative">
        {/* Filter icon for mobile */}
        <div className="flex gap-2 items-center justify-end md:hidden mb-4 overflow-hidden">
          <button
            className="text-xl p-2 border border-gray-300 rounded-md"
            onClick={() => setOpenDrawer(true)}
          >
            <Image
              src="/theme1/filter.png"
              alt="Filter"
              width={20}
              height={20}
            />
          </button>
          <p className="heading-1 text-[#000000]">{i18n.t("Filters")}</p>
        </div>

        {/* Drawer for filters */}
        <Drawer
          title={i18n.t("Filters")}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          className="sm:hidden"
        >
          <HotelFilters getData={getData} />
        </Drawer>
        <div className="flex flex-col sm:flex-row xl:gap-6 lg:gap-5 md:gap-4 gap-3">
          <div className="w-full md:w-[30%] xl:w-[25%] hidden md:block">
            <HotelFilters getData={getData} />
          </div>
          <div className="w-full md:w-[70%] xl:w-[75%]">
            {
              data?.docs?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 lg:gap-5 md:gap-4 gap-3">
                  {
                    data?.docs?.map((item, index) => (
                      <HotelCard key={index} data={item} index={index} />
                    ))
                  }
                </div>
              ) : (
                <Empty description="No Hotels Found" />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
