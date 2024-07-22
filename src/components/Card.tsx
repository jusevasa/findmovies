import { Star } from './icons/Star';

interface ICard {
  id: number;
  imgUrl: string;
  title?: string;
  rating: number;
  handleClick: (id: number) => void;
}

export const Card: React.FC<ICard> = ({
  id,
  imgUrl,
  title,
  rating,
  handleClick,
}) => {
  return (
    <div
      className='w-44 flex-none cursor-pointer'
      onClick={() => handleClick(id)}
    >
      <div className='relative transform transition-transform duration-300 hover:-translate-y-2'>
        <img
          src={`https://image.tmdb.org/t/p/original${imgUrl}`}
          alt={title}
          className='w-full h-64 object-cover rounded-lg'
        />
        <div className='absolute bottom-0 flex justify-center items-center bg-black p-2'>
          <Star />
          <span className='text-white text-sm px-2 py-1 rounded-lg'>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className='text-md text-white text-center mt-4'>{title}</p>
    </div>
  );
};
