import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/navbar";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function MainLayout() {
  const { dir } = useLanguage();
  
  return (
    <div style={{ direction: dir }}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
