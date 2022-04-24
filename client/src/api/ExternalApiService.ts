import env from "react-dotenv";
import {
    UpcomingMoviesResponse,
    PopularTVshowsResponse,
    TopRatedMoviesResponse,
    MovieGenresResponse,
    MovieDetails,
    MovieVideos,
    MovieVideosResponse,
    UpcomingMoviesSearchResponse,
} from "./ExternalApiResponseTypes";
import axios, {AxiosResponse} from "axios";

export default class ExternalApiService {
    static async getUpcomingMovies(page = 1){
        return axios({
            url: env.TMDB + `/movie/upcoming?api_key=${env.API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<UpcomingMoviesResponse>) => {
                return response.data;
            })

    }
     static async getUpcomingMoviesSearch(query: string){
        return axios({
            url: env.TMDB + `/search/movie?api_key=${env.API_KEY}&language=en-US&query=${query}&page=${1}&include_adult=false`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<UpcomingMoviesSearchResponse>) => {
                return response.data;
            })

    }
    static async getPopularTVshows(page = 1) {
        return axios({
            url: env.TMDB + `/tv/popular?api_key=${env.API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<PopularTVshowsResponse>) => {
                return response.data;
            })

    }
    static async getTopRatedMovies(page = 1){
        return axios({
            url: env.TMDB + `/movie/top_rated?api_key=${env.API_KEY}&language=en-US&page=${page}`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<TopRatedMoviesResponse>) => {
                return response.data;
            })

    }

    static async getMovieGenres(){
        return axios({
            url: env.TMDB + `/genre/movie/list?api_key=${env.API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<MovieGenresResponse>) => {
                return response.data;
            })

    }
    static async getMovieDetails(id :string){
        return axios({
            url: env.TMDB + `/movie/${id}?api_key=${env.API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<MovieDetails>) => {
                return response.data;
            })

    }
    static async getMovieVideos(id :string){
        return axios({
            url: env.TMDB + `/movie/${id}/videos?api_key=${env.API_KEY}&language=en-US`,
            method: 'GET',
            responseType: 'json',
        })
            .then((response:AxiosResponse<MovieVideosResponse>) => {
                return response.data;
            })

    }
}