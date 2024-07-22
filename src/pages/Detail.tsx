import { Star } from '@/components/icons/Star';
import { useFetch } from '@/hooks/useFetch';
import { getDetailCategorie } from '@/services/detail';
import { DetailMovie } from '@/types/detailMovie';
import { useParams } from 'react-router-dom';

export const Detail = () => {
  const { id, media_type } = useParams<{ id: string; media_type: string }>();

  const { data, loading } = useFetch<DetailMovie>(
    () => getDetailCategorie({ id: id, type: media_type }),
    1,
    id
  );

  if (loading) {
    return (
      <div className='w-full'>
        <div className='h-64 bg-lightGray-36 mb-4 w-screen'></div>
        <div className='mt-16 w-full mx-auto container flex gap-x-8'>
          <div className='h-96 w-full max-w-64 bg-lightGray-36 rounded-md'></div>
          <div className='w-full'>
            <div className='h-12 bg-lightGray-36 mb-4 w-full rounded-md'></div>
            <div className='flex gap-4'>
              <div className='h-8 bg-lightGray-36 w-16 rounded-md'></div>
              <div className='h-8 bg-lightGray-36 w-24 rounded-md'></div>
              <div className='h-8 bg-lightGray-36 w-16 rounded-md'></div>
            </div>
            <div className='h-20 bg-lightGray-36 mt-4 w-full rounded-md'></div>
          </div>
        </div>
      </div>
    );
  }

  const renderReleaseDate = (item?: DetailMovie | null) => {
    if (item === null) return '';
    if (media_type === 'movie' && item != null) {
      return new Date(item.release_date).getFullYear();
    }
    if (media_type === 'tv' && item != null) {
      return new Date(item.first_air_date).getFullYear();
    }
  };

  return (
    <main className=''>
      <div className='container mx-auto flex justify-between py-12'>
        <div className='flex flex-col justify-start'>
          <span className='text-brightYellow font-bold'>MOVIE</span>
          <h1 className='text-4xl font-bold text-white'>
            {media_type === 'movie' ? data?.original_title : data?.name}
          </h1>
          <p className='text-white flex gap-2 font-bold text-sm mt-3'>
            {renderReleaseDate(data)}
            <span>2h 59m</span>
          </p>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <Star />
          <span className='text-3xl text-white'>
            {data?.vote_average.toFixed(1)}
          </span>
          <span className='text-gray-500 flex flex-col text-xs'>
            <span>{data?.vote_count}</span>
            <span>ratings</span>
          </span>
        </div>
      </div>
      <div className='container mx-auto mt-16 flex gap-8 flex-col justify-center items-center md:flex-row md:justify-start md:items-start'>
        <div className='w-64'>
          <img
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
            alt='The Lord of the Rings: The Two Towers'
            className='w-full max-w-64 h-96 object-cover rounded-lg'
          />
        </div>
        <div className='flex-1'>
          <div className='flex items-center bg-brightYellow text-black font-bold border border-brightYellow rounded-md w-max'>
            <div className='bg-brightYellow py-1 px-2 rounded-l-md'>
              Awards & nominations
            </div>
            <div className='pl-2 pt-1 bg-black text-white font-normal rounded-md'>
              Won 2 Oscars 130 wins & 136 nominations total
            </div>
          </div>
          <div className='flex space-x-2 mt-6'>
            {data?.genres.map((genre) => (
              <span
                className='bg-darkGray text-white py-1 px-3 rounded-full border border-lightGray-36'
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className='mt-6 text-white'>{data?.overview}</p>
          {/* <div className='mt-5 flex flex-col gap-3'>
            <p className='text-white'>
              <strong className='text-lightGray-60 font-normal mr-2'>
                Director:
              </strong>
              Peter Jackson
            </p>
            <p className='text-white'>
              <strong className='text-lightGray-60 font-normal mr-2'>
                Screenplay:
              </strong>
              Peter Jackson, Fran Walsh
            </p>
            <p className='text-white'>
              <strong className='text-lightGray-60 font-normal mr-2'>
                Stars:
              </strong>
              Elijah Wood, Ian McKellen
            </p>
            <p className='text-white '>
              <strong className='text-lightGray-60 font-normal mr-2'>
                Countries of Origin:
              </strong>
              New Zealand, United States
            </p>
            <p className='text-white'>
              <strong className='text-lightGray-60 font-normal mr-2'>
                Release date:
              </strong>
              December 5, 2002
            </p>
          </div> */}
        </div>
      </div>
    </main>
  );
};
