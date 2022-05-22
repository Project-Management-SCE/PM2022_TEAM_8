import React, { useEffect } from "react";
import { PopularTVshows } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import "../Style/Movies.css";
import ContentList from "../components/ContentList";
import MyPagination from "../components/MyPagination";
import {useNavigate, useParams} from "react-router-dom";

const TvShows = () => {
  const [series, setSeries] = React.useState<PopularTVshows[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const nav = useNavigate();
  const {pageNumber}= useParams()
  const page = pageNumber ? parseInt(pageNumber) : 1;
  useEffect(() => {
    try {
      ExternalApiService.getPopularTVshows(page).then((response) => {
        setSeries(response.results as unknown as PopularTVshows[]);
        setTotalPages(response.total_pages);
      });
    } catch (e) {
      console.log(e);
    }
  }, [page]);
  return (
    <div className="movies-container">
      <h1>Series</h1>
      <MyPagination page={page} total={totalPages}  onChange={(page)=>nav(`/movies/${page}`)}/>
      <div className="row">
        <ContentList items={series} NoDataElement={LoadingSpinner}/>
      </div>
      <MyPagination page={page} total={totalPages}  onChange={(page)=>nav(`/series/${page}`)}/>
    </div>
  );
};

export default TvShows;
