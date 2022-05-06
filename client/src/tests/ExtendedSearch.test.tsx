import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import ExternalApiService from "../api/ExternalApiService";
import ExtendedSearch from "../Pages/ExtendedSearch";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";

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


const movieGenres =
    [
        {
            id: 20,
            name: 'GenreTest1',
            checked: true
        },
        {
            id: 30,
            name: 'GenreTest2',
            checked: false
        }
    ]
const tvGenres = [
    {
        id: 22,
        name: 'GenreTest3',
        checked: true
    },
    {
        id: 33,
        name: 'GenreTest4',
        checked: false
    }]


const response = {
    dates: {
        maximum: '',
        minimum: ''
    },
    page: 1,
    results:
        [
            {
                adult: false,
                backdrop_path: '',
                genre_ids: [10, 20],
                id: 10,
                original_language: 'EN',
                original_title: 'test1',
                overview: '',
                popularity: 10,
                poster_path: '',
                release_date: '',
                title: 'test1',
                video: false,
                vote_average: 10,
                vote_count: 10
            }
        ],
    total_pages: 12,
    total_results: 100
}

describe("Test Extended Search content discovery", () => {
    //mock the api calls
    beforeEach(() => {
        jest.spyOn(ExternalApiService, 'getMovieGenres').mockResolvedValue({genres: movieGenres});
        jest.spyOn(ExternalApiService, 'getDiscoverMovies').mockResolvedValue(response);
        jest.spyOn(ExternalApiService, 'getTVGenres').mockResolvedValue({genres: tvGenres});
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    test('Mocks movie pull functionality', async () => {
        render(<BrowserRouter><ExtendedSearch/></BrowserRouter>);
        await act(async () => {
            expect(await screen.findByText(/GenreTest1/)).toBeInTheDocument()
            expect(await screen.findByText(/GenreTest2/)).toBeInTheDocument()
            const button = await screen.findByTestId(/Search/);
            expect(button).toBeInTheDocument();
            userEvent.click(button);
            expect(await screen.findByText(/test1/)).toBeInTheDocument()
            expect(await screen.findByTestId(/movie-div/)).toBeInTheDocument()
        });
        expect(ExternalApiService.getDiscoverMovies).toHaveBeenCalledTimes(2);
    })
});

