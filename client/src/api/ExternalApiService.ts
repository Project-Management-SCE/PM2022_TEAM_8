import {
    UpcomingMoviesResponse,
    PopularTVshowsResponse,
    TopRatedMoviesResponse,
    GenresResponse,
    MovieDetails,
    MovieVideos,
    MovieVideosResponse,
    UpcomingMoviesSearchResponse, TrendingResponse,
} from "./ExternalApiResponseTypes";
import axios, {AxiosResponse} from "axios";
const TMDB_URL = "https://api.themoviedb.org/3";
const API_KEY = "5dcf7f28a88be0edc01bbbde06f024ab"
export default class ExternalApiService {
    static async getUpcomingMovies(page = 1){
        return axios({
            url: `${TMDB_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<UpcomingMoviesResponse>) => {
                return response.data;
            })

    }
     static async getUpcomingMoviesSearch(query: string,page = 1){
        return axios({
            url: `${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<UpcomingMoviesSearchResponse>) => {
                return response.data;
            })

    }
    static async getPopularTVshows(page = 1) {
        return axios({
            url:`${TMDB_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<PopularTVshowsResponse>) => {
                return response.data;
            })

    }
    static async getTopRatedMovies(page = 1){
        return axios({
            url: `${TMDB_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<TopRatedMoviesResponse>) => {
                return response.data;
            })

    }

    static async getMovieGenres(){
        return axios({
            url: `${TMDB_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<GenresResponse>) => {
                return response.data;
            })

    }
    static async getTVGenres(){
        return axios({
            url: `${TMDB_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<GenresResponse>) => {
                return response.data;
            })

    }
    static async getMovieDetails(id :string){
        return axios({
            url:`${TMDB_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<MovieDetails>) => {
                return response.data;
            })

    }
    static async getMovieVideos(id :string){
        return axios({
            url:`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<MovieVideosResponse>) => {
                return response.data;
            })

    }
    static async getTrending(){
        return axios({
            url:`${TMDB_URL}/trending/all/day?api_key=${API_KEY}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<TrendingResponse>) => {
                return response.data;
            })
    }
}