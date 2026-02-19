import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";

import css from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(
    [],
  );
  const [isLoading, setIsLoading] =
    useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error(
        "Please enter your search query.",
      );
      return;
    }

    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error(
          "No movies found for your request.",
        );
        return;
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) =>
    setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading &&
        !isError &&
        movies.length > 0 && (
          <MovieGrid
            movies={movies}
            onSelect={openModal}
          />
        )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
