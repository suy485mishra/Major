import React from "react";
import useUser from "../hooks/useUser";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates";
import { getSavedResumes } from "../api";
import { useQuery } from "react-query";
import { NoData } from "../assets";

const UserProfile = () => {
  const { data: user, isError, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("collections");
  const { data: savedResumes } = useQuery(["savedResumes"], async () => {
    const resumes = await getSavedResumes(user?.uid);
    console.log(resumes);
    return resumes;
  });
  
  const {
    data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch,
  } = useTemplates();

  const navigate = useNavigate();

  if (temp_isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start py-12">
      <div className="w-full h-72 bg-blue-200">
        <img
          src="https://cdn.pixabay.com/photo/2019/04/14/10/27/book-4126483_1280.jpg"
          alt="bgimage"
          className="w-full h-full object-cover"
        />

        <div className="flex items-center  justify-center flex-col gap-4">
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md  "
              alt="profile picture"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <img
              src={
                "https://cdn.pixabay.com/photo/2023/01/28/06/57/man-7750139_1280.png"
              }
              className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
              alt="profile picture"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          )}
          <p className="text-2xl text-txtDark">
            {user?.displayName || "Guest"}
          </p>
        </div>

        <div className="flex items-center justify-center mt-12 ">
          <div
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("collections")}
          >
            <p
              className={`text-base text-txtPrimary  group-hover:text-blue-500 px-4 py-1 rounded-full ${
                activeTab === "collections" &&
                "bg-white shadow-md text-blue-500"
              }`}
            >
              Collection
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("resumes")}
          >
            <p
              className={`text-base text-txtPrimary group-hover:text-blue-500 px-4 py-1 rounded-full ${
                activeTab === "resumes" && "bg-white shadow-md text-blue-500"
              }`}
            >
              My Resumes
            </p>
          </div>
        </div>

        <div className="w-full grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
          <AnimatePresence>
            {activeTab === "collections" && (
              <React.Fragment>
                {user?.collections?.length > 0 ? (
                  <RenderATemplate
                    templates={templates?.filter((temp) =>
                      user?.collections?.includes(temp?._id)
                    )}
                  />
                ) : (
                  <div className="col-span-12 flex w-full flex-col items-center justify-center gap-3">
                    <img
                       src={
                       NoData
                      }
                      className="w-32 h-auto object-contain"
                      alt="noo"
                    />
                    <p>No Data</p>
                  </div>
                )}
              </React.Fragment>
            )}
            {activeTab === "resumes" && (
              <React.Fragment>
                {savedResumes && savedResumes.length > 0 ? (
                  <RenderATemplate
                    templates={savedResumes}
                  />
                ) : (
                  <div className="col-span-12 flex w-full flex-col items-center justify-center gap-3">
                    <img
                      src={
                       NoData
                      }
                      className="w-32 h-auto object-contain"
                      alt="noo"
                    />
                    <p>No Data</p>
                  </div>
                )}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RenderATemplate = ({ templates }) => {
  return (
    <>
      {templates && templates.length > 0 && (
        <React.Fragment>
          <AnimatePresence>
            {templates.map((template, index) => (
              <TemplateDesignPin
                key={template?.id}
                data={template}
                index={index}
              />
            ))}
          </AnimatePresence>
        </React.Fragment>
      )}
    </>
  );
};

export default UserProfile;
