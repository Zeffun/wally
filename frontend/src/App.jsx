import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";

import * as authService from '../src/services/authService';

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(authService.getUser());

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/facts" element={<FaqPage />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
}

export default App;
