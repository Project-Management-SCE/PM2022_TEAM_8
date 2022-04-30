import React, { useEffect } from "react";
import { PopularTVshows } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import "../Style/Movies.css";
import ContentList from "../components/ContentList";
import MyPagination from "../components/MyPagination";

const Series = () => {
  const [series, setSeries] = React.useState<PopularTVshows[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
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
      <div className="row">
        <ContentList items={series} NoDataElement={LoadingSpinner}/>
      </div>
      <MyPagination page={page} total={totalPages} onChange={(page)=>setPage(page)}/>
    </div>
  );
};

export default Series;
