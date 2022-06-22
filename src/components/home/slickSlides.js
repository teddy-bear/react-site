import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import API from "../../api";
import Spinner from "../functional/Spinner";
import SlickSlide from "./slickSlide";

export default function SlickSlider() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.get('?limit=12');
            setData(response.data.products);
        };
        fetchData();
    }, []); // [] needed to run only once

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        className: 'slick-home',
        slidesToShow: 3,
        slidesToScroll: 3,
        //lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    };

    let content;

    if (data.length) {
        content = data.map((item, index) => {
            return <SlickSlide key={index} product={item}></SlickSlide>;
        });
    }

    return data.length ? <Slider {...settings}>{content}</Slider> : <Spinner/>;
}
