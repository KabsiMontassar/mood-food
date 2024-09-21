import React from "react";
import SearchHeader from "../components/HomeComps/SearchHeader";
import OurServices from "../components/HomeComps/OurServices";
import RecettePres from "../components/HomeComps/RecettePres";
import ProductsPres from "../components/HomeComps/ProductsPres";
import MobilePres from "../components/HomeComps/MobilePres";

const Home = () => {
  return (
    <>
       <SearchHeader />
      <OurServices />
      <RecettePres />
      <ProductsPres />
      <MobilePres />
    </>
  );
};

export default Home;
