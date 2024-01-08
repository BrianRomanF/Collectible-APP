import React from "react";

import ProductHero from "./views/ProductHero";
import Album from "./../components/Album/Album";


const HomePage = () => {
  return (
    <div>
      <ProductHero />
      <div style={{ marginTop: '50px' }}> {/* Adjust the margin as needed */}
        <Album />
      </div>
    </div>
  );
};

export default HomePage;
