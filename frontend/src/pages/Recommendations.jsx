import React from "react";
import AiHero from "../components/layout/ui/aiRecom/aiHero";
import AIDashboard from "../components/layout/ui/aiRecom/AIDashboard";
import AiResults from "../components/layout/ui/aiRecom/AiResults";

const Recommendations = () => {
  return (
    <div>
      <AiHero />
      <AIDashboard />
      <AiResults />
    </div>
  );
};

export default Recommendations;
