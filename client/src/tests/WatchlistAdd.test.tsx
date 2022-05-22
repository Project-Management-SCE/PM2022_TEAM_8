import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import ExternalApiService from "../api/ExternalApiService";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import Movie from "../Pages/Movie";
import UserService from "../api/internalAPI/userApi";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

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
    adult: false,
    backdrop_path: '/k2oHk58c8ycqX7EzLG2O6WNjVCW.jpg',
    belongs_to_collection: null,
    budget: 0,
    genres: [ { id: 18, name: 'Drama',checked:false }, { id: 53, name: 'Thriller' ,checked:false} ],
    homepage: '',
    id: 543,
    imdb_id: 'tt0019702',
    original_language: 'en',
    original_title: 'Blackmail',
    overview: 'London, 1929. Frank Webber, a very busy Scotland Yard detective, seems to be more interested in his work than in Alice White, his girlfriend. Feeling herself ignored, Alice agrees to go out with an elegant and well-mannered artist who invites her to visit his fancy apartment.',
    popularity: 7.656,
    poster_path: '/klilqRJDTANv9XMTBbL51NOsOXZ.jpg',
    production_companies: [
        {
            id: 305,
            logo_path: null,
            name: 'British International Pictures',
            origin_country: 'GB'
        }
    ],
    production_countries: [ { iso_3166_1: 'GB', name: 'United Kingdom' } ],
    release_date: '1929-07-28',
    revenue: 0,
    runtime: 86,
    spoken_languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
    status: 'Released',
    tagline: "Hold everything till you've heard this one!",
    title: 'Blackmail',
    video: false,
    vote_average: 6.6,
    vote_count: 161
}
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '12',
    }),
}));
describe("Add to Watchlist functionality & Movie Component", () => {
    //mock the api calls
    beforeEach(() => {
        jest.spyOn(ExternalApiService, 'getMovieDetails').mockResolvedValue(movieDetails);
        jest.spyOn(ExternalApiService, 'getMovieVideos').mockResolvedValue({id: 0, results: []});
        jest.spyOn(UserService, 'addToWatch').mockResolvedValue({ result: "Success"});
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
                } },
            user: {
                isLoading: false
            }
        });
        render(<Provider store={store}><BrowserRouter><Movie/></BrowserRouter></Provider>);
        await act(async () => {
            const button = await screen.findByTestId(/addTo/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
            expect(await screen.findByText(/Blackmail/)).toBeInTheDocument();
        });
        expect(ExternalApiService.getMovieDetails).toHaveBeenCalledTimes(1);
        expect(ExternalApiService.getMovieVideos).toHaveBeenCalledTimes(1);
        expect(UserService.addToWatch).toHaveBeenCalledTimes(1);
    })
});

