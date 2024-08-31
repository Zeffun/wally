import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import AccountMainPage from "./pages/AccountMainPage";
import ProfilePage from "./pages/ProfilePage";
import * as authService from '../src/services/authService';

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(authService.getUser());
  const location = useLocation()
  const showNavBar = !location.pathname.startsWith('/account');
  const showNavBarUser = location.pathname.startsWith('/account');

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>

        {showNavBar && <Navbar/>}
        {showNavBarUser && <NavbarUser/>}

        {showNavBar && <Navbar user={user} handleSignout={handleSignout}/>}

        <Routes>
          {user ? (
            <>
              <Route path="/" element={<ProfilePage />} />
            </>
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/facts" element={<FaqPage />} />
          <Route path="/account/main" element={<AccountMainPage/>}/>
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
}

export default App;
