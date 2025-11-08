import React, {useEffect} from "react";
import "./aiHeroBg.css";
import useTravelCost from "../../context/TravelContext";
import { UserOutlined } from "@ant-design/icons";
import img1 from "../../../../assets/aiherobg.jpg"
import AOS from "aos";


const AiHero = () => {
  const { user } = useTravelCost();
  useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
      }, []);
  return (
    <>
      <div className="aiHeroBG text-center py-5" 
          style={{
            backgroundImage: `url(${img1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height:"400px"
          }}
          data-aos="fade-up"
      >
        <div className="my-5 py-5">
          <h1 className="text-danger">AI Travel Recommendations</h1>
          <p className="fw-medium fs-5">
            Personalized trip suggestions powered by AI
          </p>
        </div>
      </div>
      {user && (
        <div className="py-3 mb-3 user">
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-body text-center">
                <h1 className="card-title">
                  Hi, <span className="text-danger">{user.name || "user"}</span>
                </h1>
                <p className="card-text fs-5">
                  “We’ve curated recommendations just for you!”
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiHero;
