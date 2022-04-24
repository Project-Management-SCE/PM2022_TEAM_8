import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  TopRatedMovies,
  PopularTVshows,
  UpcomingMovie,
} from "../api/ExternalApiResponseTypes";
import ExternalApiService from "../api/ExternalApiService";
import CarouselMovies from "../components/CarouselMovies";
import { PopUp } from "../components/PopUp";
import { IUser } from "../api/internalAPI/internalApiTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import "../Style/home.css";

const Home = () => {
  const [search, setSearch] = React.useState<TopRatedMovies[]>([]);
  const [topMovies, setTopMovies] = React.useState<TopRatedMovies[]>([]);
  const [topSeries, setTopSeries] = React.useState<PopularTVshows[]>([]);
  const curr_user = useSelector<AppStateType>(
    (state) => state.auth.user
  ) as IUser;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    try {
      ExternalApiService.getUpcomingMovies().then((response) => {
        setTopMovies(response.results.slice(0, 5) as TopRatedMovies[]);
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

  let query = "morbius";
  //TODO: Create search results page
  //TODO: delete variable query and use search input
  // This useEffect below get by query the result as array of movie objects
  useEffect(() => {
    try {
      ExternalApiService.getUpcomingMoviesSearch(query).then((response) => {
        setSearch(response.results as UpcomingMovie[]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  //console.log(search);

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
          <NavLink to="movies" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
          {topMovies.length
            ? topMovies.map((movie) => (
                <div className="col-md-4" key={movie.id}>
                  <div className="card">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className="card-img-top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt="Card image cap"
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="category-row">
          <span className="category-header">Series</span>
          <NavLink to="series" className="see-all">
            <button>See All</button>
          </NavLink>
        </div>
        <div className="movies-flex">
          {topSeries.length
            ? topSeries.map((movie) => (
                <div className="col-md-4" key={movie.id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            : ""}
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
