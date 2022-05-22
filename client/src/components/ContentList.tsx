import React, {FC} from 'react';
import {PopularTVshows, UpcomingMovie} from "../api/ExternalApiResponseTypes";
import {Link} from "react-router-dom";
import {List, Result} from 'antd';

interface Props {
    items: UpcomingMovie[] | PopularTVshows[];
    NoDataElement: FC;
}

const ContentList: FC<Props> = ({items, NoDataElement}) => {

    const getType = (movie:UpcomingMovie | PopularTVshows)=> {
        let type = {title:'',type:''};
        if('title' in movie) {
            type['title'] = movie.title
            type['type'] = 'movie'
        }
        else{
            type['title'] = movie.name;
            type['type'] = 'tv-show';
        }
        return type;
    }
    return (
            <List<UpcomingMovie | PopularTVshows>
                grid={{
                    gutter: 0,
                    xs: 1,
                }}
                dataSource={items}
                locale={{emptyText: <NoDataElement/>}}
                renderItem={movie=> (
                    <List.Item>
                            <div className="card" data-testid="movie-div">
                                <Link style={{textDecoration:"none"}} to={`/${getType(movie).type}/${movie.id}`}>
                                    {
                                        movie.poster_path? <img
                                                className="card-img-top"
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt="Card image cap"
                                            />
                                            :
                                            <Result
                                                status="warning"
                                                title="There is no poster for this movie yet!!!"

                                            />
                                    }
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {getType(movie).title}
                                    </h5>
                                </div>
                            </div>
                    </List.Item>
                )}
                style={{
                    marginTop: '20px',
                    marginBottom: '50px',
                }}
            >
            </List>
    );
};

export default ContentList;