import { useState, useEffect } from 'react';
import { getAllMovies } from '@/services/movies';
import { Movie } from '@/types/movie';
import { useFetch } from '@/hooks/useFetch';

export const useMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error } = useFetch<{ results: Movie[] }>(
    () => getAllMovies({ page: currentPage }),
    currentPage
  );

  useEffect(() => {
    if (data) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setHasMoreMovies(data.results.length > 0);
      setLoadingMore(false);
    }
  }, [data]);

  const loadMoreMovies = () => {
    if (hasMoreMovies && !loadingMore) {
      setLoadingMore(true);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  };

  return {
    movies,
    hasMoreMovies,
    loading,
    error,
    loadMoreMovies,
  };
};
