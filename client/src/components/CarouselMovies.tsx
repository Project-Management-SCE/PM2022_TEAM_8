import React, {useEffect, useState} from "react";
import "../Style/home.css";
import Carousel from "react-bootstrap/Carousel";
import {MovieVideos, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";

const CarouselMovies = () => {
  const [index, setIndex] = useState<number>(0);
  const [trending, setTrending] = useState<UpcomingMovie[]>([]);
  useEffect(() => {
    try {
      ExternalApiService.getTrending().then((movieResponse) => {
        setTrending(movieResponse.results.slice(0, 3));
      });
    } catch (e) {
      console.log(e);
    }

  }, []);
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  return (
      <>
        {trending.length===3 && <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-container"
        >
          <Carousel.Item >
            <h3 className="card-title">{trending[0].title}</h3>
            <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500${trending[0].poster_path}`}  />
          </Carousel.Item>
          <Carousel.Item >
            <h3 className="card-title">{trending[1].title}</h3>
            <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500${trending[1].poster_path}`}  />
          </Carousel.Item>
          <Carousel.Item >
            <h3 className="card-title">{trending[2].title}</h3>
            <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500${trending[2].poster_path}`}  />
          </Carousel.Item>
        </Carousel>}
      </>

  );
};

export default CarouselMovies;
