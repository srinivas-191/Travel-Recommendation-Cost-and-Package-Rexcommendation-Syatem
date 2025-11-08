import React from "react";
import HomeHero from "../components/layout/ui/home/HomeHero";
import HomeSlider from "../components/layout/ui/home/HomeSlider";
import HomeAI from "../components/layout/ui/home/HomeAI";
import HomeIndicators from "../components/layout/ui/home/HomeIndicators";
import HomeSearchWidget from "../components/layout/ui/home/HomeSearchWidget";

const Home = () => {
  return (
    <>
      <HomeHero
        header="Travel Site"
        caption="The traveler sees what he sees, the tourists sees what he has come to see."
      />
      <HomeSlider />
      <HomeAI />
      <HomeSearchWidget />
      <HomeIndicators />
    </>
  );
};

export default Home;
