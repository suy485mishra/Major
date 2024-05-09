import React from "react";
import { Filters, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";

const HomePage = () => {
  const {
    data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch,
  } = useTemplates();
  return (
    <div className="w-full px-4 py-6 flex flex-col items-center lg:px-12 justify-start">
      {/* filter section */}
      <Filters />

      {/* render reSume */}
      {temp_isError ? (
        <React.Fragment>
          <p className="text-lg text-txtDark">Something went wrong!</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <RenderATemplate templates={templates} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
const RenderATemplate = ({ templates }) => {
  return (
    <>
      {templates && templates.length > 0 ? (
        <React.Fragment>
          <AnimatePresence>
            {templates &&
              templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?.id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>No data found</p>
        </React.Fragment>
      )}
    </>
  );
};

export default HomePage;
