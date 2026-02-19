import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (
  query: string,
): Promise<Movie[]> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token)
    throw new Error("TMDB token is missing");

  try {
    // ✅ Дженерик тип безпосередньо у axios.get
    const response: AxiosResponse<MoviesResponse> =
      await axios.get<MoviesResponse>(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    return response.data.results;
  } catch (error) {
    console.error("FetchMovies error:", error);
    throw error;
  }
};
