import axios from "axios";
import { TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, TMDB_API_KEY, ENDPOINTS, YOUTUBE_BASE_URL } from "../constants/Urls"

const TMDB_HTTP_REQUEST = axios.create({
    baseURL: TMDB_BASE_URL,
    params:{
        api_key: TMDB_API_KEY,
    },
});

const getNowPlayingMovies = () => 
    TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES)

const getUpComingMovies = () => 
    TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES)

const getAllGenres = () => 
    TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES)


const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`

const getMovieById = (movieId, append_to_response = "") => 
    TMDB_HTTP_REQUEST.get(
        `${ENDPOINTS.MOVIE}/${movieId}`,
        append_to_response ? { params: { append_to_response }} :null
    )
const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`

export { getNowPlayingMovies, getUpComingMovies, getAllGenres, getPoster ,getMovieById, getVideo}