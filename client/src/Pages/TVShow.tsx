import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Genres, MovieVideos, TvShowDetails} from "../api/ExternalApiResponseTypes";
import {AppStateType} from "../redux/Store";
import {IUser} from "../api/internalAPI/internalApiTypes";
import Moment from "moment";
import ExternalApiService from "../api/ExternalApiService";
import {addToWatch} from "../redux/reducers/user-reducer";
import {Modal} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import MovieCard from "../components/MovieCard";
import Reviews from "../components/Reviews";

const TvShow = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [tvShow, setTvShow] = useState<TvShowDetails>();
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
            ExternalApiService.getTvShowDetails(id).then((tvShowResponse) => {
                setTvShow(tvShowResponse);
            });
        } catch (e) {
            console.log(e);
        }
        try {
            id &&
            ExternalApiService.getTvShowsVideos(id).then((response) => {
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
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
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
                    backgroundImage: tvShow
                        ? `url(https://image.tmdb.org/t/p/w500${tvShow?.poster_path})`
                        : "",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    opacity: 1,
                }}
            >
                {tvShow && (
                    <div
                        className="col-lg-3"
                        style={{
                            margin: "auto",
                        }}
                        key={tvShow.id}
                    >
                        {officialTrailer && (
                            <Modal
                                title={`Official Trailer : ${tvShow.name}`}
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
                            genres={tvShow.genres}
                            overview={tvShow.overview}
                            poster_path={tvShow.poster_path}
                            release_date={tvShow.release_date}
                            title={tvShow.name}
                            id={tvShow.id}
                            officialTrailer={officialTrailer! }
                            addToWatchList={addToWatchList}
                            setIsReviewModalVisible={setIsReviewModalVisible}
                            runtime={tvShow.runtime}
                            showTrailerModal={showModal}
                            vote_count={tvShow.vote_count}
                            type={"TVSHOW"}
                        />
                    </div>
                )}
                {id && <Reviews movieID={id} setIsReviewModalVisible={setIsReviewModalVisible}
                                isReviewModalVisible={isReviewModalVisible}
                                type={"TVSERIES"}
                                contentTitle={tvShow?.name || ""}
                />}
            </div>
        </>
    );
};



export default TvShow;