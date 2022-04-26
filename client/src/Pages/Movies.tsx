import React, { FC, useEffect } from "react";
import { UpcomingMovie } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import GenresList from "../components/GenresList";
import "../Style/Movies.css";
import ContentList from "../components/ContentList";
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
          <ContentList items={movies} NoDataElement={LoadingSpinner}/>
      </div>
      <GenresList />
    </div>
  );
};

export default Movies;
