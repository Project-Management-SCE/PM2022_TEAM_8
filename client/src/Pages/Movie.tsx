import React, { FC, useEffect, useState } from "react";
import {
  MovieDetails,
  Genres,
  MovieVideos,
} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import "../Style/movieCard.css";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import { IUser } from "../api/internalAPI/internalApiTypes";
import { addToWatch } from "../redux/reducers/user-reducer";
import Reviews from "../components/Reviews";
import MovieCard from "../components/MovieCard";
const Movie: FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();
  const [videos, setVideos] = useState<MovieVideos[]>([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [isTrailerModalVisible, setTrailerModalVisible] = useState(false);
  const showModal = () => {
    setTrailerModalVisible(true);
  };

  const handleCancel = () => {
    setTrailerModalVisible(false);
  };
  const addToWatchList = (
    id: number,
    genre_ids: Genres[],
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    type: string,
  ) => {

    dispatch(
      addToWatch(
        curr_user,
        id,
        genre_ids.map((element) => element.name),
        overview,
        poster_path,
        release_date,
        title,
          type
      )
    );
  };
  return (
      <>
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
              visible={isTrailerModalVisible}
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
          <MovieCard
            genres={movie.genres}
            overview={movie.overview}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            title={movie.title}
            id={movie.id}
            officialTrailer={officialTrailer! }
            addToWatchList={addToWatchList}
            setIsReviewModalVisible={setIsReviewModalVisible}
            runtime={movie.runtime}
            showTrailerModal={showModal}
            vote_count={movie.vote_count}
            type={"MOVIE"}
          />
        </div>
      )}
      {id && <Reviews movieID={id} setIsReviewModalVisible={setIsReviewModalVisible}
                      isReviewModalVisible={isReviewModalVisible}
                      type={"MOVIE"}
                      contentTitle={movie?.title || ""}
      />}
    </div>
    </>
  );
};

export default Movie;
