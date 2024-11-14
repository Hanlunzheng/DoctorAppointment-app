import React from "react";

import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Header />
      <SpecialityMenu />
      <TopDoctor />
      <Banner />
    </div>
  );
};

export default Home;
