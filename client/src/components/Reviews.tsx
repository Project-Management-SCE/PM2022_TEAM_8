import {List, Comment} from 'antd';
import React, {FC, useEffect} from 'react';
import { IReview } from '../api/internalAPI/internalApiTypes';
import "../Style/Reviews.css";
import {faFlag, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const data = [
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        recommendation: true,
        movieTitle: "The Godfather",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        recommendation: true,
        movieTitle: "The Godfather",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        recommendation: true,
        movieTitle: "The Godfather",
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        movieTitle: "The Godfather",
        recommendation: true,
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        movieTitle: "The Godfather",
        recommendation: true,
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        movieTitle: "The Godfather",
        recommendation: true,
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "2",
        movieTitle: "The Godfather",
        recommendation: true,
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda 
        consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam 
        molestiae non numquam omnis perferendis qui quos soluta, voluptatum.
        `
    },
    {
        userEmail: "test2@gmail.com",
        userID: "2",
        movieID: "1",
        movieTitle: "The Godfather",
        recommendation: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, assumenda " +
            "consequatur debitis earum eius esse ex excepturi, facere hic impedit laboriosam " +
            "molestiae non numquam omnis perferendis qui quos soluta, voluptatum."
    },
] as IReview[];
interface ReviewsProps {
    movieID: string;
}
const Reviews:FC<ReviewsProps> = ({movieID}) => {
    useEffect(() => {
        console.log(movieID);
    }, [movieID]);
    return (
        <div className={"reviews-container"}>
        <List<IReview>
            className="review-list"
            bordered={true}
            rowKey={(item: IReview) => item.userEmail}
            header={`${data.length} Reviews`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={rev => (
                    <Comment
                        className={'review-item'}
                        author={
                        <>
                            <h4>{rev.userEmail.split('@')[0]}</h4>
                        </>
                       }
                        content={<>
                            <FontAwesomeIcon  className="like-icon review-report" icon={faFlag} />
                            { rev.text}
                        </>}
                        actions={[
                            <FontAwesomeIcon  className="like-icon review-recommend" icon={rev.recommendation?
                                faThumbsUp: faThumbsDown} style={{color:rev.recommendation?"green":"red"}}/>
                        ]}
                   />


            )}
        />
        </div>
    );
};

export default Reviews;
