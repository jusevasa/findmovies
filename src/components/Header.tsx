import { Link } from 'react-router-dom';
import { Logo } from './icons/Logo';
import { Input } from './Input';

export const Header = () => {
  return (
    <header>
      <nav className='w-full'>
        <div className='container mx-auto flex items-center py-7 gap-x-16'>
          <Link to={'/'}>
            <div className='flex items-center gap-x-2'>
              <Logo />
              <p className='text-white'>FindMovies</p>
            </div>
          </Link>
          <div className='flex-1'>
            <Input />
          </div>
        </div>
      </nav>
    </header>
  );
};
