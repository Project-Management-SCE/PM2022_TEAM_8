import React, {useEffect, useState} from 'react';
import "../Style/ExtendedSearch.css";
import {Genres, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import ExtendedSearchMenu from "../components/ExtendedSearchMenu";
import Movies from "./Movies";
import ContentList from "../components/ContentList";
import NoResults from "../components/NoResults";
import { useParams} from "react-router-dom";
import MyPagination from "../components/MyPagination";

const ExtendedSearch = () => {
    const [searchType, setSearchType] = useState("Movies");
    const [genresMovies, setGenresMovies] = useState<Genres[]>([]);
    const [genresTV, setGenresTV] = useState<Genres[]>([]);
    const {query} = useParams();
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [search, setSearch] = React.useState<UpcomingMovie[]>([]);
    useEffect(() => {
        try {
            //TODO:change to appropriate api call
            query && ExternalApiService.getUpcomingMoviesSearch(query,page).then((response) => {
                setSearch(response.results as UpcomingMovie[]);
                setTotalPages(response.total_pages);
            });
        } catch (e) {
            console.log(e);
        }
    }, [query,page]);
    useEffect(() => {
        try {
            ExternalApiService.getMovieGenres().then((response) => {
                setGenresMovies(response.genres as unknown as Genres[]);
            });
            ExternalApiService.getTVGenres().then((response) => {
                setGenresTV(response.genres as unknown as Genres[]);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className="extended-search-container">
            <ExtendedSearchMenu searchType={searchType}
                                setSearchType={setSearchType}
                                genres={searchType === "Movies" ? genresMovies : genresTV}
                                setGenres={setGenresMovies}/>
            {/*TODO:
                1.create appropriate TMDB query
                2.Add search results to Content list component
            */}
            <div>
                <MyPagination page={page} total={totalPages}  onChange={(page)=>setPage(page)}/>
                <ContentList items={search} NoDataElement={NoResults} />
            </div>

        </div>
    );
};

export default ExtendedSearch;