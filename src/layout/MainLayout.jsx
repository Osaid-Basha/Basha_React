import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/navbar";


export default function MainLayout() {
  return (<>
    <Navbar/>
    <Outlet/>
   <Footer/>
   </>
 
  )
}
