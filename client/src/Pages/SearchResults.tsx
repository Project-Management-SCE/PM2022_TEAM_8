import React, { FC, useEffect } from "react";
import { UpcomingMovie } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import "../Style/Movies.css";
import {Link, useParams} from "react-router-dom";

const SearchResults: FC = () => {
    const {query} = useParams();
    const [search, setSearch] = React.useState<UpcomingMovie[]>([]);
    useEffect(() => {
        try {
            query && ExternalApiService.getUpcomingMoviesSearch(query).then((response) => {
                setSearch(response.results as UpcomingMovie[]);
            });
        } catch (e) {
            console.log(e);
        }
    }, [query]);

    return (
        <div className="movies-container">
            <h1>Search Results</h1>
            <div className="row">
                {search.length > 0 ? (
                    search.map((movie) => {
                        const strLength = movie.overview.length;
                        let temp1, temp2;
                        if (strLength >= 100) {
                            temp1 = movie.overview.slice(0, 100);
                            temp2 = `${temp1}...`;
                        }

                        return (

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
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">{temp2}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <br/>
                        <h3 style={{textAlign:"center", marginTop:"10%"}}>No results </h3>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;

