import { useState, createContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";

import CreateAccountPage from "./pages/CreateAccountPage";

import AccountMainPage from "./pages/AccountMainPage";
import AccountDepositsPage from "./pages/AccountDepositsPage";
import AccountHelpPage from "./pages/AccountHelpPage";
import AccountTransfersPage from "./pages/AccountTransfersPage";
import AccountProfilePage from "./pages/AccountProfilePage";
import AccountTransactionsPage from "./pages/AccountTransactionsPage";
import AccountWithdrawPage from "./pages/AccountWithdrawPage";

import * as authService from "../src/services/authService";

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();
  

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate("/");
    console.log("test");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        {user ? <NavbarUser user={user} handleSignout={handleSignout} /> :  <Navbar />}
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/account/createAccount" element={<CreateAccountPage/>} />
              <Route path="/account/main" element={<AccountMainPage user={user} />}/>
              <Route path="/account/transaction"element={<AccountTransactionsPage />}/>
              <Route path="/account/transfer" element={<AccountTransfersPage />} />
              <Route path="/account/deposit" element={<AccountDepositsPage />} />
              <Route path="/account/help" element={<AccountHelpPage />} />
              <Route path="/account/profile" element={<AccountProfilePage handleSignout={handleSignout}/>} />
              <Route path="/account/withdraw" element={<AccountWithdrawPage/>} />
            </>
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          <Route path="/signin" element={<SignInPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/facts" element={<FaqPage />} />

         
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
}

export default App;
