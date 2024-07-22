import { useState, useEffect } from 'react';
import { getAllSeries } from '@/services/series';
import { useFetch } from '@/hooks/useFetch';
import { Serie } from '@/types/serie';

export const useSeriesList = () => {
  const [series, setSeries] = useState<Serie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreSeries, setHasMoreSeries] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error } = useFetch<{ results: Serie[] }>(
    () => getAllSeries({ page: currentPage }),
    currentPage
  );

  useEffect(() => {
    if (data) {
      setSeries((prevSeries) => [...prevSeries, ...data.results]);
      setHasMoreSeries(data.results.length > 0);
      setLoadingMore(false);
    }
  }, [data]);

  const loadMoreSeries = () => {
    if (hasMoreSeries && !loadingMore) {
      setLoadingMore(true);
      setCurrentPage((prevPage: number) => prevPage + 1);
    }
  };

  return {
    series,
    hasMoreSeries,
    loading,
    error,
    loadMoreSeries,
  };
};
