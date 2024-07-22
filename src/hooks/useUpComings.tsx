import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { useFetch } from '@/hooks/useFetch';
import { getAllUpComings } from '@/services/upcomings';

export const useUpComings = () => {
  const [upComings, setUpComings] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreUpComings, setHasMoreUpComings] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error } = useFetch<{ results: Movie[] }>(
    () => getAllUpComings({ page: currentPage }),
    currentPage
  );

  useEffect(() => {
    if (data) {
      setUpComings((prevUpComings) => [...prevUpComings, ...data.results]);
      setHasMoreUpComings(data.results.length > 0);
      setLoadingMore(false);
    }
  }, [data]);

  const loadMoreUpComings = () => {
    if (hasMoreUpComings && !loadingMore) {
      setLoadingMore(true);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  };

  return {
    upComings,
    hasMoreUpComings,
    loading,
    error,
    loadMoreUpComings,
  };
};
