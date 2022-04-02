import React, { useEffect } from "react";
import { PopularTVshows } from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import LoadingSpinner from "../components/LoadingSpinner";
import "../Style/Movies.css";

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
        {series.length > 0 ? (
          series.map((obj) => {
            const strLength = obj.overview.length;

            let temp1, temp2;
            if (strLength >= 100) {
              temp1 = obj.overview.slice(0, 100);
              temp2 = `${temp1}...`;
            }
            return (
              <div className="col-md-4" key={obj.id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{obj.name}</h5>
                    <p className="card-text">{temp2}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Series;
