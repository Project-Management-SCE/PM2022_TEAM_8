import React, {FC} from 'react';
import {PopularTVshows, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import {Link} from "react-router-dom";
import { Result } from 'antd';

interface Props {
    items: UpcomingMovie[] | PopularTVshows[];
    NoDataElement: FC;
}

const ContentList: FC<Props> = ({items, NoDataElement}) => {

    const getType = (movie:UpcomingMovie | PopularTVshows)=> {
        let type = {title:'',type:''};
        if('title' in movie) {
            type['title'] = movie.title
            type['type'] = 'movie'
        }
        else{
            type['title'] = movie.name;
            type['type'] = 'tv-show';
        }
        return type;
    }
    return (
        <>
            {items.length > 0 ?
                items.map(movie =>
                    movie.overview.length >= 100 ?
                        <div className="col-md-4" key={movie.id}>
                            <div className="card">
                                 <Link style={{textDecoration:"none"}} to={`/${getType(movie).type}/${movie.id}`}>
                                    {
                                        movie.poster_path? <img
                                        className="card-img-top"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="Card image cap"
                                        />
                                            :
                                        <Result
                                        status="warning"
                                        title="There is no poster for this movie yet!!!"

                                       />
                                    }
                                    </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {getType(movie).title}
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