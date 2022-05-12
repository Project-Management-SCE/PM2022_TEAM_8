import React, { useEffect } from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import { IUser, Watchlist } from "../api/internalAPI/internalApiTypes";
import {
  getWatchlist,
  removeFromWatchList,
} from "../redux/reducers/user-reducer";
import { Button, Card, List, Tag, Tooltip } from "antd";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import NoResults from "../components/NoResults";

export const WatchList = () => {
  const dispatch = useDispatch();
  const curr_user = useSelector<AppStateType>(
    (state) => state.auth.user
  ) as IUser;
  const handleRemove = (id: number) => {
    dispatch(removeFromWatchList(curr_user.id!, id));
  };
  useEffect(() => {
    dispatch(getWatchlist(curr_user.id!));
  }, []);
  const watchlist = useSelector<AppStateType>(
    (state: AppStateType) => state.user.watchlist
  ) as Watchlist[];

  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>WatchList</h1>
          <div className="watchlist-container">
            <List
              grid={{
                gutter: 0,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
              dataSource={watchlist}
              locale={{ emptyText: <NoResults /> }}
              renderItem={(movie) => (
                <List.Item>
                  <Card
                    key={movie.id}
                    style={{
                      width: 350,
                      borderColor: "red",
                      marginLeft: "2rem",
                      padding: "5px",
                      minHeight: 750,
                      backgroundColor: "#efefef",
                    }}
                    actions={[
                      <Tooltip title="Go to content">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/movie/${movie.id}`}
                        >
                          <Button
                            type="ghost"
                            shape="circle"
                            icon={<RightOutlined />}
                          />
                        </Link>
                      </Tooltip>,
                      <Tooltip title="Remove from list">
                        <Button
                            data-testid="remove"
                          onClick={() => handleRemove(movie.id)}
                          type="ghost"
                          shape="circle"
                          icon={<DeleteOutlined key="ellipsis" />}
                        />
                      </Tooltip>,
                    ]}
                    size={"default"}
                    extra={<p className="watchlist-title">{movie.title}</p>}
                    cover={
                      <img
                        alt="example"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                    }
                  >
                    <div className="watchlist-content">
                      <Card.Meta style={{ marginTop: 2, marginBottom: 4 }} />
                      <p>Genres</p>
                      {movie.genre_ids.map((genre) => (
                        <Tag className="genre-tag" key={genre} color="volcano">
                          {genre}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </List.Item>
              )}
              style={{
                marginTop: "20px",
                marginBottom: "50px",
              }}
            />
          </div>
        </div>
      }
    />
  );
};
