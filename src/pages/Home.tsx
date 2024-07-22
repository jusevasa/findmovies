import { useState } from 'react';

import { NavigationCategories } from '@/components/NavigationCategories';
import { Categories } from '@/enums/categories';
import { useMoviesList } from '@/hooks/useMoviesList';
import List from '@/components/List';
import { useSeriesList } from '@/hooks/useSeriesList';
import { useUpComings } from '@/hooks/useUpComings';
import { NotFound } from '@/components/icons/NotFound';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    Categories.MOVIES
  );

  const {
    movies,
    hasMoreMovies,
    loading: moviesLoading,
    error: errorMovies,
    loadMoreMovies,
  } = useMoviesList();

  const {
    series,
    hasMoreSeries,
    loading: seriesLoading,
    error: errorSeries,
    loadMoreSeries,
  } = useSeriesList();

  const {
    upComings,
    hasMoreUpComings,
    loading: upcomingsLoading,
    error: errorUpComings,
    loadMoreUpComings,
  } = useUpComings();

  const isLoadingData = () => {
    return moviesLoading && seriesLoading;
  };

  const isError = () => {
    return errorMovies || errorSeries || errorUpComings;
  };

  if (isError()) {
    return (
      <section className='container mx-auto mt-56 text-white flex justify-center flex-col items-center'>
        <NotFound />
        <h1 className='font-bold text-3xl'>Oops....</h1>
        <p className='mt-4'>Something went wrong.</p>
        <button
          className='mt-5 bg-brightYellow text-black py-2 px-4 rounded-md hover:bg-brightHYellow transition-colors'
          onClick={() => {
            loadMoreMovies();
            loadMoreSeries();
            loadMoreUpComings();
          }}
        >
          Refresh
        </button>
      </section>
    );
  }

  return (
    <main className='overflow-x-hidden'>
      <section className='container mx-auto mt-16'>
        {isLoadingData() ? (
          <div className='w-96 h-8 bg-lightGray-36 rounded-md'></div>
        ) : (
          <h1 className='text-brightYellow text-2xl font-bold'>
            Featured Today
          </h1>
        )}

        <NavigationCategories
          onCategoryChange={(category: Categories) => {
            setSelectedCategory(category);
          }}
          isLoading={isLoadingData()}
        />
        {selectedCategory === Categories.MOVIES && (
          <List
            items={movies}
            hasMore={hasMoreMovies}
            loading={moviesLoading}
            loadMore={loadMoreMovies}
          />
        )}
        {selectedCategory === Categories.SERIES && (
          <List
            items={series}
            hasMore={hasMoreSeries}
            loading={seriesLoading}
            loadMore={loadMoreSeries}
          />
        )}
      </section>
      <section className='container mx-auto mt-20'>
        {upcomingsLoading ? (
          <div className='w-96 h-8 bg-lightGray-36 rounded-md'></div>
        ) : (
          <h2 className='text-brightYellow text-2xl font-bold'>
            Premieres and announcements
          </h2>
        )}

        <List
          items={upComings}
          hasMore={hasMoreUpComings}
          loading={upcomingsLoading}
          loadMore={loadMoreUpComings}
        />
      </section>
    </main>
  );
};
