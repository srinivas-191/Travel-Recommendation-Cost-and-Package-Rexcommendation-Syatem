import React, {useEffect} from "react";
import "./favhero.css";
import AOS from "aos";

const FavouritesHero = () => {
  useEffect(() => {
            AOS.init({ duration: 1000, once: true });
            AOS.refresh();
          }, []);
  return (
    <div className="container-fluid">
      <div className="row favhero text-center" data-aos="fade-down-left">
        <div className="col-12 d-flex flex-column justify-content-center">
          <h3>💖💖 Meet Your Favourites 💓💓</h3>
          <p className="fs-5">
            Favourites are not the easiest pickings which one has to pick out,
            It has certain specialities to attract one's heart
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavouritesHero;
