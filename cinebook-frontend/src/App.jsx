import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/layout/Footer";

 function AppContent(){
  const location=useLocation();
  const isAdminRoute=location.pathname.startsWith("/admin");

  return(
    <>
    {!isAdminRoute&&<Navbar/>}
    <div className={!isAdminRoute?"container mt-4":""}>
      <AppRoutes/>
    </div>
    {!isAdminRoute&& <Footer/>}
    </>
  );
 }

 function App(){
  return(
    <BrowserRouter>
    <AppContent/>
    </BrowserRouter>
  );
 }
 export default App;
