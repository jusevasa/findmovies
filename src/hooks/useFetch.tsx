import { useState, useEffect } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
  page?: number,
  query?: string
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, query]);

  return { data, loading, error };
};
