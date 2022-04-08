import React, { FC, useEffect, useState } from "react";
import { MovieDetails, MovieVideos } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleBolt,
  faCalendarAlt,
  faClock,
  faPlay,
  faFilm,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import "../Style/movieCard.css";

const Movie: FC = () => {
  //get id from url
  const id = window.location.pathname.split("/")[2];
  const [movie, setMovie] = useState<MovieDetails>();
  const [videos, setVideos] = useState<MovieVideos[]>([]);
  let officialTrailer = videos.find(
    (element) => element.name == "Official Trailer"
  );
  Moment.locale("en");
  useEffect(() => {
    try {
      ExternalApiService.getMovieDetails(id).then((movieResponse) => {
        setMovie(movieResponse);
      });
    } catch (e) {
      console.log(e);
    }
    try {
      ExternalApiService.getMovieVideos(id).then((response) => {
        setVideos(response.results as MovieVideos[]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url(" + `https://image.tmdb.org/t/p/w500${movie?.poster_path}` + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 1,
      }}
    >
      {movie && (
        <div
          className="col-lg-3"
          style={{
            margin: "auto",
          }}
          key={movie.id}
        >
          {console.log(movie.imdb_id)}
          <div className="movie-card">
            <img
              className="card-img-top"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Card image cap"
            />
            <div className="card-body">
              <h4 className="card-title">{movie.title}</h4>
              <div className="movie-likes">
                <FontAwesomeIcon
                  className="like-icon"
                  icon={faHeartCircleBolt}
                />
                <span>{movie.vote_count}</span>
                <FontAwesomeIcon className="like-icon" icon={faCalendarAlt} />
                <span>{Moment(movie.release_date).format("d MMM Y")}</span>
                <FontAwesomeIcon className="like-icon" icon={faClock} />
                <span>{movie.runtime}min</span>
              </div>
              <h5 className="summery">SUMMARY</h5>
              <p className="card-text">{movie.overview}</p>
              <div className="movie-links">
                <div className="links">
                  {officialTrailer ? (
                    <>
                      <a
                        href={`https://www.youtube.com/watch?v=${officialTrailer.key}`}
                        target="_blank"
                      >
                        <FontAwesomeIcon className="fa-icon" icon={faPlay} />
                      </a>
                      <span>Trailer</span>
                    </>
                  ) : (
                    ""
                  )}

                  <FontAwesomeIcon className="fa-icon" icon={faFilm} />
                  <span>+WatchList</span>
                  <FontAwesomeIcon className="fa-icon" icon={faPenToSquare} />
                  <span>+Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;

function useParams(): { id: any } {
  throw new Error("Function not implemented.");
}
