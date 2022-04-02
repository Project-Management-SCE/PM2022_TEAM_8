import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import {
//   TopRatedMovies,
//   PopularTVshows,
// } from "../api/ExternalApiResponseTypes";
// import ExternalApiService from "../api/ExternalApiService";
import CarouselMovies from "../components/CarouselMovies";
// import MovieCard from "../components/MovieCard";
import "../Style/home.css";

const Home = () => {
  //   const [topMovies, setTopMovies] = React.useState<TopRatedMovies[]>([]);
  //   const [topSeries, setTopSeries] = React.useState<PopularTVshows[]>([]);

  //   useEffect(() => {
  //     try {
  //       ExternalApiService.getUpcomingMovies().then((response) => {
  //         setTopMovies(response.results.slice(0, 5) as TopRatedMovies[]);
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     try {
  //       ExternalApiService.getPopularTVshows().then((response) => {
  //         setTopSeries(
  //           response.results.slice(0, 5) as unknown as PopularTVshows[]
  //         );
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }, []);

  return (
    <div className="home-container">
      <CarouselMovies />
      <div className="category-container">
        <div className="category-row">
          <span className="category-header">Movies</span>
          <NavLink to="movies" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
          {/* {topMovies.length
            ? topMovies.map((movie) => (
                <div className="col-md-4" key={movie.id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                    </div>
                  </div>
                </div>
              ))
            : ""} */}
        </div>
        <div className="category-row">
          <span className="category-header">Series</span>
          <NavLink to="series" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
          {/* {topSeries.length
            ? topSeries.map((movie) => (
                <div className="col-md-4" key={movie.id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            : ""} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
