import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import clearAllMocks = jest.clearAllMocks;
import ExternalApiService from "../api/ExternalApiService";
import ExtendedSearch from "../Pages/ExtendedSearch";
import ExtendedSearchMenu from "../components/ExtendedSearchMenu";
import userEvent from "@testing-library/user-event";
let axios = require('axios').default;

const mockStore = configureMockStore([thunk]);
jest.mock("axios");

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


describe("Test Extended Search content discovery", () => {
    beforeEach(clearAllMocks);

    ExternalApiService.getMovieGenres = axios.get.mockImplementation(() => Promise.resolve({
        genres: [{
            id: '20',
            name: 'GenreTest1',
            checked:'true'
        },
            {
                id: '30',
                name: 'GenreTest2',
                checked:'false'
            }
        ]
    }))
    ExternalApiService.getTVGenres = axios.get.mockImplementation(() => Promise.resolve({
        genres: [{
            id: '22',
            name: 'GenreTest3',
            checked:'false'
        },
            {
                id: '33',
                name: 'GenreTest4',
                checked:'false'
            }
        ]
    }))
    ExternalApiService.getDiscoverMovies = axios.get.mockImplementation(() => Promise.resolve({response:
        {
            dates:{
                maximum:'',
                minimum:''
            },
            page:1,
            results:
                [
                {adult: 'true',
                backdrop_path: '',
                genre_ids: [10,20],
                id: 10,
                original_language: 'EN',
                original_title: 'test1',
                overview: '',
                popularity: 10,
                poster_path: '',
                release_date: '',
                title: 'test1',
                video: 'false',
                vote_average: 10,
                vote_count: 10}
                ],
            total_pages: 12,
            total_results: 100
        }}
    ));
    test('Mocks movie pull functionality', async () => {
        const store = mockStore({
            auth: { user: {
                    email: 'test@email.com',
                    firstName: 'ab',
                    lastName: 'abc',
                    type: 'User',
                    phone: '12',
                    address: 'ab'
                } }
        });
        await act(async () => {
            render(<Provider store={store}><BrowserRouter>
                <ExtendedSearchMenu
                endYear={'1'}
                genres={[
                    {
                        id:20,
                        name:'GenreTest1',
                        checked:false},
                    {
                        id:30,
                        name:'GenreTest2',
                        checked:false}]
                }
                genresList={'20%2c30'}
                getSearch={''}
                searchContent={''}
                searchType={'Movies'}
                setEndYear={''}
                setGenres={''}
                setSearchType={''}
                setStartYear={''}
                startYear={'2333'}/></BrowserRouter></Provider>);
        });


        const button = await screen.findByText(/Search/);
        expect(button).toBeInTheDocument();
        userEvent.click(button);
        render(<Provider store={store}><BrowserRouter>
            <ExtendedSearch/></BrowserRouter></Provider>);

        expect(ExternalApiService.getDiscoverMovies).toHaveBeenCalledTimes(1);
    })

});

