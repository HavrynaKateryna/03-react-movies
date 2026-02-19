import type { FormEvent } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({
  onSubmit,
}: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(
      formRef.current,
    );
    const query =
      formData.get("query")?.toString().trim() ||
      "";

    if (!query) {
      toast.error(
        "Please enter your search query.",
      );
      return;
    }

    onSubmit(query);
    formRef.current.reset(); // очищає поле після пошуку
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form
          className={css.form}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input
            className={css.input}
            type="text"
            name="query" // обов'язково для FormData
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
          />
          <button
            className={css.button}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
