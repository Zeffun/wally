import background from "../assets/singapore.jpg";

export default function HomePage() {
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
  return (
    <div style={backgroundStyle}>
      <h1 style={headingStyle}>Welcome, Simon.</h1>
    </div>
  );
}
