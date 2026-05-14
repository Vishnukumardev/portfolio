import React, { memo } from "react";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import "./Home.css";

// 1. Define structural interface contract for container elements
interface HomeProps {
  id?: string;
}

const Home: React.FC<HomeProps> = memo((props) => {
  const { id = "" } = props;

  return (
    <div className="home-container" id={id}>
      <Header />
      <Profile />
      <Footer />
    </div>
  );
});

Home.displayName = "Home";
export default Home;
