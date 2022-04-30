import React, {useEffect, useState} from 'react';
import "../Style/ExtendedSearch.css";
import {MovieGenres} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import ExtendedSearchMenu from "../components/ExtendedSearchMenu";
import Movies from "./Movies";
import ContentList from "../components/ContentList";
import NoResults from "../components/NoResults";

const ExtendedSearch = () => {
    const [searchType, setSearchType] = useState("Movies");
    const [genres, setGenres] = useState<MovieGenres[]>([]);
    useEffect(() => {
        try {
            ExternalApiService.getMovieGenres().then((response) => {
                setGenres(response.genres as unknown as MovieGenres[]);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className="extended-search-container">
            <ExtendedSearchMenu searchType={searchType} setSearchType={setSearchType} genres={genres} setGenres={setGenres}/>
            {/*TODO:
                1.create appropriate TMDB query
                2.Add search results to Content list component
            */}
                <ContentList items={[]} NoDataElement={NoResults}/>
        </div>
    );
};

export default ExtendedSearch;