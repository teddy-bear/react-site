import React from "react";
import MyGallery from "./gallery";
import SlickSlider from "./slickSlides";

function HomePage() {
    return (
        <div className="page-home">
           {/* <MyGallery/>*/}
            <h1>Our products</h1>
            <SlickSlider/>
        </div>
    )
}

export default HomePage;