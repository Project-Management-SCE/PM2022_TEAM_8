import React, {useEffect, useState} from "react";
import "../Style/ExtendedSearch.css";
import {
    Genres,
    PopularTVshows,
    UpcomingMovie,
} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import ExtendedSearchMenu from "../components/ExtendedSearchMenu";
import Movies from "./Movies";
import ContentList from "../components/ContentList";
import NoResults from "../components/NoResults";
import MyPagination from "../components/MyPagination";

const ExtendedSearch = () => {
    const [searchType, setSearchType] = useState("Movies");
    const [genresMovies, setGenresMovies] = useState<Genres[]>([]);
    const [genresTV, setGenresTV] = useState<Genres[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [search, setSearch] = React.useState<UpcomingMovie[] | PopularTVshows[]>([]);
    const [startYear, setStartYear] = useState<any>("");
    const [endYear, setEndYear] = useState<any>("");
    let genresList = "";
    const searchBuffer = "%2C";

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

    const getSelectedGenres = () => {
        const selectedGenres = genresMovies.map((obj) => {
            if (obj.checked) {
                return obj.id;
            }
        });
        let filtered = selectedGenres.filter((x) => {
            return x !== undefined;
        });
        return filtered;
    };
    const getSearch = () => {
        const genresArr = getSelectedGenres();
        let genresList = "";
        if (genresArr.length >= 1) {
            genresArr.map((obj) => {
                return (genresList += obj!.toString() + searchBuffer);
            });
        }
        return genresList;
    };

    const searchMovies = () => {
        try {
            ExternalApiService.getDiscoverMovies(
                startYear,
                endYear,
                page,
                getSearch()
            ).then((response) => {
                setSearch(response.results as UpcomingMovie[]);
                setTotalPages(response.total_pages);
            });
        } catch (e) {
            console.log(e);
        }
    };
    const searchSeries = () => {
        try {
            ExternalApiService.getDiscoverSeries(
                startYear,
                endYear,
                page,
                getSearch()
            ).then((response) => {
                setSearch(response.results as PopularTVshows[]);
                setTotalPages(response.total_pages);
            });
        } catch (e) {
            console.log(e);
        }
    };
    const searchContent = () => {
        if (searchType == "Movies") {
            searchMovies();
        } else {
            searchSeries();
        }
    };
    useEffect(searchContent, [page]);

    return (
        <div className="extended-search-container">
            <ExtendedSearchMenu
                searchType={searchType}
                setSearchType={setSearchType}
                genres={searchType === "Movies" ? genresMovies : genresTV}
                setGenres={setGenresMovies}
                startYear={startYear}
                setStartYear={setStartYear}
                endYear={endYear}
                setEndYear={setEndYear}
                genresList={genresList}
                getSearch={getSearch}
                searchContent={searchContent}
            />

            <div>
                <MyPagination
                    page={page}
                    total={totalPages}
                    onChange={(page) => setPage(page)}
                />
                <ContentList items={search} NoDataElement={NoResults}/>
            </div>
        </div>
    );
};

export default ExtendedSearch;
