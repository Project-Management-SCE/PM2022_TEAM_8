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
        setTrending(movieResponse.results.slice(0, 5));
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
        {trending.length===5 && <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-container"
        >
          {trending.map((movie, index) => {
            return (
                <Carousel.Item key={index}>
                  <h3 className="card-title">{movie.title}</h3>
                  <img className="carousel-img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  />
                </Carousel.Item>
            );
          })}
        </Carousel>}
      </>

  );
};

export default CarouselMovies;
