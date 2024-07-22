import { useNavigate } from 'react-router-dom';
import { Multi } from '@/types/multi';
import { LoadingSearch } from './LoadingSearch';

interface SearchResultsProps {
  search: string;
  loading: boolean;
  data: { results: Multi[] } | null;
  onClickItem: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  search,
  loading,
  data,
  onClickItem,
}) => {
  const navigate = useNavigate();

  const renderTitle = (item: Multi) =>
    'title' in item ? item.title : item.name;

  const renderReleaseDate = (item: Multi) =>
    item?.release_date ? new Date(item.release_date).getFullYear() : '';

  const renderItem = (item: Multi) => (
    <li
      className='p-3 flex justify-start items-center gap-5 cursor-pointer hover:bg-lightGray-16'
      key={item.id}
      onClick={() => {
        const mediaType = 'title' in item ? 'movie' : 'tv';
        onClickItem();
        navigate(`/detail/${item.id}/${mediaType}`);
      }}
    >
      <div className='w-14 min-h-20'>
        {item.poster_path && (
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

  const renderLoading = () => (
    <div className='absolute bg-darkGray w-full h-32 z-20 mt-1.5 rounded-md'>
      <LoadingSearch />
    </div>
  );

  const renderNotFound = (value: string) => (
    <div className='absolute bg-darkGray w-full z-20 mt-1.5 rounded-md text-white flex items-center py-6 px-2'>
      {`No results found for “${value}” phrase.`}
    </div>
  );

  return (
    <div>
      {loading && search && renderLoading()}
      {!loading &&
        search &&
        data?.results.length === 0 &&
        renderNotFound(search)}
      {!loading && data?.results && search && (
        <ul className='absolute bg-darkGray w-full h-auto z-20 mt-1.5 rounded-md'>
          {data.results.slice(0, 4).map(renderItem)}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
