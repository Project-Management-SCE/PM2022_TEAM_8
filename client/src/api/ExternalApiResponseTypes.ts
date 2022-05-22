export interface UpcomingMoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: UpcomingMovie[];
  total_pages: number;
  total_results: number;
  status_code?: number;
  status_message?: string;
  success?: boolean;
}
export interface UpcomingMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularTVshowsResponse {
  page: number;
  results: PopularTVshows[];
  total_pages: number;
  total_results: number;
  status_code?: number;
  status_message?: string;
  success?: boolean;
}
export interface PopularTVshows {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface TopRatedMoviesResponse {
  page: number;
  results: UpcomingMovie[];
  total_pages: number;
  total_results: number;
  status_code?: number;
  status_message?: string;
  success?: boolean;
}
export interface TopRatedMovies {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  video: boolean;
  release_date: string;
  vote_count: number;
}
export interface MovieDetails {
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface TvShowDetails {
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MovieVideosResponse {
  id: number;
  results: MovieVideos[];
}
export interface MovieVideos {
  iso_639_: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface GenresResponse {
  genres: Genres[];
}
export interface Genres {
  id: number;
  name: string;
  checked: false | true;
}

export interface UpcomingMoviesSearchResponse {
  page: number;
  results: UpcomingMovie[];
  total_pages: number;
  total_results: number;
}
export interface TrendingResponse {
  page: number;
  results: UpcomingMovie[];
  total_pages: number;
  total_results: number;
}
