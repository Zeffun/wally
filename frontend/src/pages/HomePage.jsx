import { useEffect } from "react";
import background from "../assets/singapore.jpg";


export default function HomePage({ handleSignout }) {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };
  const headingStyle = {
    paddingTop: "35px",
    paddingLeft: "35px",
  };

  useEffect(()=>{
    handleSignout();
  },[])
  
  
  return (
    <div style={backgroundStyle}>
      <h1 style={headingStyle}>Your money is safe with us</h1>
    </div>
  );
}
