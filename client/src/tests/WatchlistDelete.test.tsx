import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import UserService from "../api/internalAPI/userApi";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {WatchList} from "../Pages/WatchList";

// DO NOT DELETE! Workaround for FC not running when rendering
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        }
    };
};

const mockStore = configureMockStore([thunk]);
const movieDetails = {
    type: "MOVIE" as const,
    userID: "123",
    genre_ids: ["Drama","Thriller"],
    id: 123,
    overview: 'London, 1929. Frank Webber, a very busy Scotland Yard detective, seems to be more interested in his work than in Alice White, his girlfriend. Feeling herself ignored, Alice agrees to go out with an elegant and well-mannered artist who invites her to visit his fancy apartment.',
    poster_path: '/klilqRJDTANv9XMTBbL51NOsOXZ.jpg',
    release_date: '1929-07-28',
    title: 'Blackmail',
}

describe("Test the removal of a movie from the user watchlist", () => {
    //mock the api calls
    beforeEach(() => {
        jest.spyOn(UserService, 'removeFromWatchList').mockResolvedValue({result:"Success"});
        jest.spyOn(UserService, 'getWatchlist').mockResolvedValue({ watchlist: [movieDetails]});
        window.scrollTo = jest.fn();
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    test('Simulating add to movie user action', async () => {
        const store = mockStore({
            auth: { user: {
                    email: 'update@email.com',
                    firstName: 'ab',
                    lastName: 'abc',
                    type: 'ab',
                    phone: '12',
                    address: 'ab'
                },
            },
            user: {
                watchlist:[
                    {
                        userID: "123",
                        genre_ids: ["Drama","Thriller"],
                        id: 123,
                        overview: 'London, 1929. Frank Webber, a very busy Scotland Yard detective, seems to be more interested in his work than in Alice White, his girlfriend. Feeling herself ignored, Alice agrees to go out with an elegant and well-mannered artist who invites her to visit his fancy apartment.',
                        poster_path: '/klilqRJDTANv9XMTBbL51NOsOXZ.jpg',
                        release_date: '1929-07-28',
                        title: 'Blackmail',
                    }
                ],
                isFetching: false,
                selected:"Watch List"
            },
            app:{
                isLoading: false,
                error: '',
                success: ''
            }
        });
        render(<Provider store={store}><BrowserRouter><WatchList/></BrowserRouter></Provider>);
        await act(async () => {
            expect(await screen.findByText(/Blackmail/)).toBeInTheDocument();
            const button = await screen.findByTestId(/remove/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
        });
        expect(UserService.getWatchlist).toHaveBeenCalledTimes(1);
        expect(UserService.removeFromWatchList).toHaveBeenCalledTimes(1);
    })
});

