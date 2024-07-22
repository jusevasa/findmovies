import React, { useRef } from 'react';
import { Movie } from '@/types/movie';
import { Card } from './Card';
import { Arrow } from './icons/Arrow';
import { CardLoading } from './CardLoading';
import { Serie } from '@/types/serie';

import { useNavigate } from 'react-router-dom';

interface ListProps {
  items: (Movie | Serie)[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const List: React.FC<ListProps> = ({ items, loading, hasMore, loadMore }) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const scrolledToEnd =
        scrollWidth - scrollRef.current.scrollLeft <= clientWidth;

      if (scrolledToEnd && hasMore && !loading) {
        loadMore();
      }
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const renderSkeleton = () => (
    <div className='flex gap-x-8 mt-8'>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <CardLoading key={item} />
      ))}
    </div>
  );

  const renderTitle = (item: Movie | Serie) => {
    if ('title' in item) {
      return item.title;
    }
    if ('name' in item) {
      return item.name;
    }
    return '';
  };

  return (
    <div className='mt-8'>
      <div className='relative w-screen'>
        {!loading && (
          <button
            onClick={scrollLeft}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 text-white px-4 pt-10 rounded-full z-10 rotate-180 hover:text-brightYellow transition-colors'
          >
            <Arrow />
          </button>
        )}
        <ul
          ref={scrollRef}
          className='flex gap-x-8 overflow-x-hidden scroll-smooth text-white w-screen'
        >
          {items.map((item) => (
            <li key={item.id}>
              <Card
                id={item.id}
                imgUrl={item.poster_path}
                rating={item.vote_average}
                title={renderTitle(item)}
                handleClick={() => {
                  const mediaType = 'title' in item ? 'movie' : 'tv';
                  navigate(`/detail/${item.id}/${mediaType}`);
                }}
              />
            </li>
          ))}
          {loading && renderSkeleton()}
        </ul>
        {hasMore && !loading && (
          <button
            onClick={scrollRight}
            className='absolute right-[12%] top-1/2 transform -translate-y-1/2 text-white px-7 pb-10 rounded-full z-10 hover:text-brightYellow transition-colors'
          >
            <Arrow />
          </button>
        )}
      </div>
    </div>
  );
};

export default List;
