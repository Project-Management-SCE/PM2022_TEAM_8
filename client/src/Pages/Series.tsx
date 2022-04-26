import React, { useEffect } from "react";
import { PopularTVshows } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import "../Style/Movies.css";
import ContentList from "../components/ContentList";

const Series = () => {
  const [series, setSeries] = React.useState<PopularTVshows[]>([]);
  useEffect(() => {
    try {
      ExternalApiService.getPopularTVshows().then((response) => {
        setSeries(response.results as unknown as PopularTVshows[]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="movies-container">
      <h1>Series</h1>
      <div className="row">
        <ContentList items={series} NoDataElement={LoadingSpinner}/>
      </div>
    </div>
  );
};

export default Series;
