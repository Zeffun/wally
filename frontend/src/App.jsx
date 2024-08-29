import { Routes, Route} from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AboutPage from "./pages/AboutPage"
import FaqPage from "./pages/FaqPage"
import { useState } from "react"

function App() {

  const [secret, setSecret] = useState(true)
  

  return (
    <>
    {secret ? <Navbar/> : <Navbar/>}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/facts" element={<FaqPage/>}/>
    </Routes>
      
    </>
  )
}

export default App
