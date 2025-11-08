
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import AOS from "aos";

// ✅ Import images properly
import tawang from "../../../../assets/tawang.jpeg";
import rishikesh from "../../../../assets/rishikesh.jpeg";
import andaman from "../../../../assets/andaman.jpeg";
import amritsar from "../../../../assets/Amritsar.jpg";
import alleppey from "../../../../assets/allipee.jpeg";
import srinagar from "../../../../assets/srinagar.jpeg";

const HomeAI = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  const destinations = [
    { image: tawang, title: "Tawang" },
    { image: rishikesh, title: "Rishikesh" },
    { image: andaman, title: "A&D Islands" },
    { image: amritsar, title: "Amritsar" },
    { image: alleppey, title: "Alappuzha" },
    { image: srinagar, title: "Srinagar" },
  ];

  return (
    <div className="m-0 py-5" data-aos="fade-up">
      <h1 className="text-center py-5">Recommendations</h1>
      <Marquee pauseOnHover={true} speed={60}>
        {destinations.map((place, index) => (
          <div className="mx-5 text-center" key={index}>
            <img
              src={place.image}
              alt={place.title}
              className="img-fluid rounded-circle"
              style={{
                height: "200px",
                width: "200px",
                objectFit: "cover",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              }}
            />
            <p className="fw-bold fs-5 mt-3">{place.title}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default HomeAI;
