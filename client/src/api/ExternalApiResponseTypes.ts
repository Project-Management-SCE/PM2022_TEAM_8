export interface UpcomingMoviesResponse{
   dates: {
      maximum: string;
      minimum: string;
   };
   page: number;
   results: UpcomingMovie[];
   total_pages: number;
   total_results: number;
   status_code?: number,
   status_message?: string
   success?: boolean
}
export interface UpcomingMovie{
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
   results: UpcomingMovie[];
   total_pages: number;
   total_results: number;
   status_code?: number,
   status_message?: string
   success?: boolean
}
export interface PopularTVshows{
   backdrop_path: string,
   first_air_date: string,
   genre_ids: number[],
   id: number,
   name: string,
   origin_country: string[],
   original_language: string,
   original_name: string,
   overview: string,
   popularity: number,
   poster_path: string,
   vote_average: number,
   vote_count: number
}
export interface TopRatedMoviesResponse {
   page: number;
   results: UpcomingMovie[];
   total_pages: number;
   total_results: number;
   status_code?: number,
   status_message?: string
   success?: boolean
}
export interface TopRatedMovies{
   backdrop_path: string,
   genre_ids: number[],
   id: number,
   title: string,
   original_language: string,
   original_title: string,
   overview: string,
   popularity: number,
   poster_path: string,
   vote_average: number,
   video: boolean,
   release_date : string,
   vote_count: number
}

export interface MovieGenresResponse{
   genres: object[]
}
export interface MovieGenres{
   id: number,
   name: string
}