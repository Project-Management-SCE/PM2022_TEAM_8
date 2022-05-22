import React, {FC} from "react";
import "../Style/movieCard.css";
import {Divider, Result} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faClock,
    faFilm,
    faHeartCircleBolt,
    faPenToSquare,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import {Genres, MovieVideos} from "../api/ExternalApiResponseTypes";
import Moment from "moment";

interface MovieCardProps {
    type: string;
    poster_path: string;
    title: string;
    officialTrailer:  MovieVideos;
    vote_count: number;
    release_date: string;
    runtime: number;
    overview: string;
    id: number;
    genres: Genres[];
    showTrailerModal: () => void;
    addToWatchList: (  id: number,
                       genres: Genres[],
                       overview: string,
                       poster_path: string,
                       release_date: string,
                       title: string,
                       type: string,
    ) => void;
    setIsReviewModalVisible: (isReviewModalVisible: boolean) => void;
}
const MovieCard:FC<MovieCardProps> = (
                                        {id,poster_path,genres,officialTrailer,
                                          overview,release_date,runtime,
                                          title,vote_count,showTrailerModal,addToWatchList,
                                         setIsReviewModalVisible,type}
    ) => {

  return (
      <div className="movie-card">
          {poster_path ? (
              <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt="Card image cap"
              />
          ) : (
              <Result
                  status="warning"
                  title="There is no poster for this movie yet!!!"
              />
          )}
          <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <div className="movie-likes">
                  <FontAwesomeIcon
                      className="like-icon"
                      icon={faHeartCircleBolt}
                  />
                  <span>{vote_count}</span>
                  <FontAwesomeIcon className="like-icon" icon={faCalendarAlt} />
                  <span>{Moment(release_date).format("d MMM Y")}</span>
                  <FontAwesomeIcon className="like-icon" icon={faClock} />
                  <span>{runtime}min</span>
                  <div className="genres-div">
                      <Divider
                          style={{borderColor: "white", color: "white"}}
                          className={"text-decor"}

                      >
                          Genres &ensp;
                      </Divider>
                      {genres.map((genre) => (
                          <span key={genre.name}> {genre.name}</span>


                      ))}
                      <Divider
                          style={{borderColor: "white", color: "white"}}
                          className={"text-decor"}
                      />
                  </div>

              </div>
              <h5 className="summery">SUMMARY</h5>
              <p className="card-text">{overview}</p>
              <div className="movie-links">
                  <div className="links">
                      {officialTrailer ? (
                          <>
                              <a onClick={showTrailerModal}>
                                  <FontAwesomeIcon className="fa-icon" icon={faPlay} />
                              </a>
                              <span>Trailer</span>
                          </>
                      ) : (
                          ""
                      )}

                      <FontAwesomeIcon className="fa-icon" icon={faFilm} />
                      <a
                          data-testid="addTo"
                          onClick={() =>
                              addToWatchList(
                                  id,
                                 genres,
                                  overview,
                                 poster_path,
                                 release_date,
                                  title,
                                  type
                              )
                          }
                      >
                          <span>+WatchList</span>
                      </a>
                      <FontAwesomeIcon className="fa-icon" icon={faPenToSquare} />
                      <a onClick={()=>setIsReviewModalVisible(true)}>
                          <span>+Review</span>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MovieCard;
