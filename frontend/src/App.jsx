import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import AccountMainPage from "./pages/AccountMainPage";


function App() {
 const location = useLocation()
 const showNavBar = !location.pathname.startsWith("/account")
  

  return (
    <>
      {showNavBar && <Navbar/>}
      <Routes location={location} key = {location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/facts" element={<FaqPage />} />
        <Route path="/account/mainpage" element={<AccountMainPage />}/>
      </Routes>
    </>
  );
}

export default App;
