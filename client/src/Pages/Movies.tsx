import React, { FC, useEffect } from "react";
import { UpcomingMovie } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import "../Style/Movies.css";
import ContentList from "../components/ContentList";
import MyPagination from "../components/MyPagination";
import {useNavigate, useParams} from "react-router-dom";
import NoResults from "../components/NoResults";
const Movies: FC = () => {
  const nav = useNavigate();
  const {pageNumber}= useParams()
  const page = pageNumber ? parseInt(pageNumber) : 1;
  const [movies, setMovies] = React.useState<UpcomingMovie[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  useEffect(() => {
    try {
      ExternalApiService.getUpcomingMovies(page).then((response) => {
        page > response.total_pages?setMovies([]):setMovies(response.results);
        setTotalPages(response.total_pages);
      });
    } catch (e) {
      console.log(e);
    }
  }, [page]);
    return (
    <div className="movies-container">
      <h1>Movies</h1>
      <h3>Upcoming Movies</h3>
      <MyPagination page={page} total={totalPages}  onChange={(page)=>nav(`/movies/${page}`)}/>
      <div className="row">
          <ContentList items={movies} NoDataElement={NoResults}/>
      </div>
    <MyPagination page={page} total={totalPages}  onChange={(page)=>nav(`/movies/${page}`)}/>
    </div>
  );
};

export default Movies;
