import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { getAllMulti } from '@/services/multi';
import { Search } from './icons/Search';
import SearchResults from './SearchResults';
import { Multi } from '@/types/multi';

export const Input = () => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useFetch<{ results: Multi[] }>(
    () => getAllMulti({ query: debouncedSearch }),
    1,
    debouncedSearch
  );

  const handleFocus = () => setIsFocused(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <div className='bg-white rounded-sm flex gap-2 justify-center items-center pl-1 focus-within:ring-1 focus-within:ring-brightYellow'>
        <Search />
        <input
          type='text'
          placeholder='Search FindMovies'
          className='bg-transparent w-full h-full py-2 outline-none text-gray-700'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
        />
      </div>
      {isFocused && (
        <SearchResults
          search={search}
          loading={loading}
          data={data}
          onClickItem={() => {
            setIsFocused(false);
          }}
        />
      )}
    </div>
  );
};
