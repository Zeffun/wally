import { NavLink } from "react-router-dom"

export default function Navbar(){

    return (<>
    
    <ul>
        <li><NavLink to="/signin">Sign In</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
    </ul>
    
    </>)
}