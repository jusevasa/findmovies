import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { getAllMulti } from '@/services/multi';
import { Multi } from '@/types/multi';
import { Search } from './icons/Search';
import { LoadingSearch } from './LoadingSearch';

export const Input = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const navigate = useNavigate();

  const { data, loading } = useFetch<{ results: Multi[] }>(
    () => getAllMulti({ query: debouncedSearch }),
    1,
    debouncedSearch
  );

  const renderLoading = () => {
    return (
      <div className='absolute bg-darkGray w-full h-32 z-20 mt-1.5 rounded-md'>
        <LoadingSearch />
      </div>
    );
  };

  const renderNotFound = (value: string) => {
    return (
      <div className='absolute bg-darkGray w-full z-20 mt-1.5 rounded-md text-white flex items-center py-6 px-2'>
        {`No results found for “${value}” phrase.`}
      </div>
    );
  };

  const renderTitle = (item: Multi) => {
    if ('title' in item) {
      return item.title;
    }
    if ('name' in item) {
      return item.name;
    }
    return '';
  };

  const renderReleaseDate = (item: Multi) => {
    if (item?.release_date != null) {
      return new Date(item?.release_date).getFullYear();
    }
    return '';
  };

  const renderItem = (item: Multi) => {
    return (
      <li
        className='p-3 flex justify-start items-center gap-5 cursor-pointer hover:bg-lightGray-16'
        key={item.id}
        onClick={() => {
          setSearch('');
          const mediaType = 'title' in item ? 'movie' : 'tv';
          navigate(`/detail/${item.id}/${mediaType}`);
        }}
      >
        <div className='w-14 min-h-20'>
          {item.poster_path != null && (
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.name}
              className='w-full h-20 object-cover rounded-lg'
            />
          )}
        </div>
        <div className='relative'>
          <h3 className='text-white font-medium'>{renderTitle(item)}</h3>
          <span className='text-lightGray-60'>{renderReleaseDate(item)}</span>
        </div>
      </li>
    );
  };

  return (
    <div className='relative'>
      <div className='bg-white rounded-sm flex gap-2 justify-center items-center pl-1 focus-within:ring-1 focus-within:ring-brightYellow'>
        <Search />
        <input
          type='text'
          placeholder='Search FindMovies'
          className='bg-transparent w-full h-full py-2 outline-none text-gray-700'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && search != '' && renderLoading()}
      {search != '' &&
        data?.results.length === 0 &&
        !loading &&
        renderNotFound(search)}
      {data?.results != null && search !== '' && (
        <ul className='absolute bg-darkGray w-full h-auto z-20 mt-1.5 rounded-md'>
          {data?.results.slice(0, 4).map((item) => renderItem(item))}
        </ul>
      )}
    </div>
  );
};
