import React, { useState } from "react";
import "../Style/home.css";
import Carousel from "react-bootstrap/Carousel";

const CarouselMovies = () => {
  const [index, setIndex] = useState<number>(0);
  const img1: string = require("../assets/img/img1.jpg");
  const img4: string = require("../assets/img/img4.jpg");
  const img5: string = require("../assets/img/img5.jpg");

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="carousel-container"
    >
      <Carousel.Item className="carousel-item">
        <img className="carousel-img" src={img1} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={img4} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="carousel-img" src={img5} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselMovies;
