import React, { FC, useEffect, useState } from "react";
import {
  MovieDetails,
  Genres,
  MovieVideos,
} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartCircleBolt,
  faCalendarAlt,
  faClock,
  faPlay,
  faFilm,
  faPenToSquare,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import "../Style/movieCard.css";
import { useParams } from "react-router-dom";
import { Modal, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import { IUser } from "../api/internalAPI/internalApiTypes";
import { addToWatch } from "../redux/reducers/user-reducer";
//
const Movie: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();
  const [videos, setVideos] = useState<MovieVideos[]>([]);
  const curr_user = useSelector<AppStateType>(
    (state) => state.auth.user
  ) as IUser;
  let officialTrailer = videos.find(
    (element) => element.name == "Official Trailer"
  );
  Moment.locale("en");
  useEffect(() => {
    try {
      id &&
        ExternalApiService.getMovieDetails(id).then((movieResponse) => {
          setMovie(movieResponse);
        });
    } catch (e) {
      console.log(e);
    }
    try {
      id &&
        ExternalApiService.getMovieVideos(id).then((response) => {
          setVideos(response.results as MovieVideos[]);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const addToWatchList = (
    id: number,
    genre_ids: Genres[],
    overview: string,
    poster_path: string,
    release_date: string,
    title: string
  ) => {

    dispatch(
      addToWatch(
        curr_user,
        id,
        genre_ids.map((element) => element.name),
        overview,
        poster_path,
        release_date,
        title
      )
    );
  };
  return (
    <div
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/w500${movie?.poster_path})`
          : "",
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
          {officialTrailer && (
            <Modal
              title={`Official Trailer : ${movie.title}`}
              visible={isModalVisible}
              width={1000}
              onCancel={handleCancel}
              footer={null}
              closeIcon={<FontAwesomeIcon className="fa-icon" icon={faClose} />}
              bodyStyle={{ background: "#eeeeee" }}
              destroyOnClose={true}
            >
              <iframe
                width="960"
                height="480"
                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal>
          )}
          <div className="movie-card">
            {movie.poster_path ? (
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Card image cap"
              />
            ) : (
              <Result
                status="warning"
                title="There is no poster for this movie yet!!!"
              />
            )}
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
                      <a onClick={showModal}>
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
                        movie.id,
                        movie.genres,
                        movie.overview,
                        movie.poster_path,
                        movie.release_date,
                        movie.title
                      )
                    }
                  >
                    <span>+WatchList</span>
                  </a>
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
