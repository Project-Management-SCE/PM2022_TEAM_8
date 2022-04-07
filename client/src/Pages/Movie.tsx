import React, {FC, useEffect, useState} from 'react';
import {MovieDetails, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";

const Movie:FC = () => {
    //get id from url
    const id = window.location.pathname.split('/')[2];
    const [movie, setMovie] = useState<MovieDetails>();
    useEffect(() => {
        try {
            ExternalApiService.getMovieDetails(id).then((movieResponse) => {
                setMovie(movieResponse);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);
    return (
        <div style={{background:"gray"}}>
            {movie && <div className="col-lg-3" style={{margin:"auto"}} key={movie.id}>
                <div className="" >
                    <img
                        className="card-img-top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Card image cap"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.overview}</p>

                    </div>
                </div>
            </div>}
        </div>
    );

};

export default Movie;

function useParams(): { id: any; } {
    throw new Error('Function not implemented.');
}
