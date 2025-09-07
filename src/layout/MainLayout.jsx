import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/navbar";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useState } from "react";

export default function MainLayout() {
  const { dir } = useLanguage();
  const[isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem("auth_token"));
  
  return (
    <div style={{ direction: dir }}>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
