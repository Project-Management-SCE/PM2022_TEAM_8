import React, {FC} from 'react';
import {PopularTVshows, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import {Link} from "react-router-dom";

interface Props {
    items: UpcomingMovie[] | PopularTVshows[];
    NoDataElement: FC;
}

const ContentList: FC<Props> = ({items, NoDataElement}) => {
    return (
        <>
            {items.length > 0 ?
                items.map(movie =>
                    movie.overview.length >= 100 ?
                        <div className="col-md-4" key={movie.id}>
                            <div className="card">
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        className="card-img-top"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="Card image cap"
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {'title' in movie ?  movie.title:movie.name}
                                    </h5>
                                    <p className="card-text">{movie.overview.slice(0, 100) + "..."}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-md-4" key={movie.id}>
                            <div className="card">
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        className="card-img-top"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="Card image cap"
                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {'title' in movie ?  movie.title:movie.name}
                                    </h5>
                                    <p className="card-text">{movie.overview}</p>
                                </div>
                            </div>
                        </div>)
                :
                <NoDataElement/>
            }
        </>
    );
};

export default ContentList;