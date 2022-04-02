import React, { useState, useEffect } from "react";
import { MovieGenres } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import "../Style/genresList.css";
export const GenresList = () => {
  const [genres, setGenres] = useState<MovieGenres[]>([]);

  useEffect(() => {
    try {
      ExternalApiService.getMovieGenres().then((response) => {
        setGenres(response.genres as unknown as MovieGenres[]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="genres-container">
      <h3>Genres List</h3>
      <div className="genres-list">
        <ul>
          {genres.length
            ? genres.map((genre) => (
                <li key={genre.id}>
                  <span>{genre.name}</span>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default GenresList;
