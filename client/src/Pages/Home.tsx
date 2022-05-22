import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PopularTVshows, UpcomingMovie,
} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import CarouselMovies from "../components/CarouselMovies";
import { PopUp } from "../components/PopUp";
import { IUser } from "../api/internalAPI/internalApiTypes";
import {useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import "../Style/home.css";
import ContentList from "../components/ContentList";
import NoResults from "../components/NoResults";

const Home = () => {
  const [topMovies, setTopMovies] = React.useState<UpcomingMovie[]>([]);
  const [topSeries, setTopSeries] = React.useState<PopularTVshows[]>([]);
  const curr_user = useSelector<AppStateType>(
    (state) => state.auth.user
  ) as IUser;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    try {
      ExternalApiService.getUpcomingMovies().then((response) => {
        setTopMovies(response.results.slice(0, 5) as UpcomingMovie[]);
      });
    } catch (e) {
      console.log(e);
    }
    try {
      ExternalApiService.getPopularTVshows().then((response) => {
        setTopSeries(
          response.results.slice(0, 5) as unknown as PopularTVshows[]
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (curr_user == null) {
      setIsOpen(true);
    }
  }, [curr_user]);
  return (
    <div className="home-container">
      <CarouselMovies />
      <div className="category-container">
        <div className="category-row">
          <span className="category-header">Movies</span>
          <NavLink to="movies/1" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
        <ContentList items={topMovies} NoDataElement={NoResults}/>
        </div>
        <div className="category-row">
          <span className="category-header">Series</span>
          <NavLink to="series/1" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
          <ContentList items={topSeries} NoDataElement={NoResults}/>
        </div>
        {isOpen && (
          <PopUp
            handleClose={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
