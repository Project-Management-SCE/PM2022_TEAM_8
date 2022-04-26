import React, { FC, useEffect } from "react";
import { UpcomingMovie } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import "../Style/Movies.css";
import {useParams} from "react-router-dom";
import ContentList from "../components/ContentList";
import NoResults from "../components/NoResults";

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
                <ContentList items={search} NoDataElement={NoResults}/>
            </div>
        </div>
    );
};

export default SearchResults;

