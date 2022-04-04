import React, { FC, useEffect, useState } from "react";
import { UpcomingMovie } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import GenresList from "../components/GenresList";
import "../Style/Movies.css";
const Movies: FC = () => {
  const [movies, setMovies] = React.useState<UpcomingMovie[]>([]);

  useEffect(() => {
    try {
      ExternalApiService.getUpcomingMovies().then((response) => {
        setMovies(response.results as UpcomingMovie[]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <h3>Upcoming Movies</h3>
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => {
            const strLength = movie.overview.length;
            let temp1, temp2;
            if (strLength >= 100) {
              temp1 = movie.overview.slice(0, 100);
              temp2 = `${temp1}...`;
            }
            return (
              <div className="col-md-4" key={movie.id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{temp2}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>{" "}
      <GenresList />
    </div>
  );
};

export default Movies;
