import { Routes, Route} from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/signin" element={<SignInPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
    </Routes>
      
    </>
  )
}

export default App
