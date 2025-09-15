'use client';
import React from "react";
import BackButton from "@/app/(dashboard)/components/common/backButton";
import { useI18n } from "@/app/contexts/i18n";
import BlogForm from "../blogForm/page";

const AddProject = () => {
  const i18n = useI18n();
  return (
    <div className="w-full overflow-x-auto my-7 px-6">
      <div className=" rounded dashboardInput bg-white px-8 py-8">
        <div className="flex justify-between items-center ">
          <h2 className="pt-3 pb-2 text-[#05073C] heading-3">{i18n.t('Add New Blog')}</h2>
          <BackButton />
        </div>
        <div className="">
          <BlogForm isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddProject;
