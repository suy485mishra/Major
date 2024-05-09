import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
//home &auth route
import { HomeScreen, Auth, CreateTemplate ,UserProfile,CreateResume,TemplateDesignPinDetails} from "../pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components";
import ContactUs from "../pages/Contactus";
import PrivacyPolicy from "../pages/PrivacyPolicy";
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/template/create" element={<><Header /> <CreateTemplate/></>} />
          <Route path="/profile/:uid" element={<><Header /> <UserProfile/></>}/>
          <Route path="/resume/*" element={<><Header /> <CreateResume/></>}/>
          <Route path="/resumeDetail/:templateID" element={<><Header /> <TemplateDesignPinDetails/></>}/>

           
        </Routes>
      </Suspense>
    
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" theme="dark" />
    </QueryClientProvider>
  );
};

export default App;
