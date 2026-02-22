import { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router';
import { useAuthStore } from '../stores/authStore';
import { CgShoppingCart } from 'react-icons/cg';
import { BiMapPin, BiSearch } from 'react-icons/bi';

export default function Navbar() {
  const { isAuth, city } = useAuthStore();
  const currLocation = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  console.log(city);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSearchParams({ search });
      } else {
        setSearchParams({});
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const isHomePage = currLocation.pathname === '/';

  return (
    <div className='w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4'>
        {/* Logo */}
        <Link
          to='/'
          className='text-2xl font-bold bg-gradient-to-r from-[#E23774] to-rose-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity'
        >
          RannaGhor
        </Link>

        {/* Right Actions */}
        <div className='flex items-center gap-3'>
          <Link
            to='/cart'
            className='relative p-2 rounded-full hover:bg-rose-50 transition-colors duration-200 group'
          >
            <CgShoppingCart
              size={22}
              className='text-gray-600 group-hover:text-[#E23774] transition-colors'
            />
            <span className='absolute -top-0.5 -right-0.5 rounded-full bg-[#E23774] text-[10px] w-5 h-5 flex items-center justify-center font-bold text-white shadow-sm'>
              0
            </span>
          </Link>

          {isAuth ? (
            <Link
              to='/profile'
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                currLocation.pathname === '/profile'
                  ? 'bg-[#E23774] text-white shadow-md shadow-rose-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Profile
            </Link>
          ) : (
            <Link
              to='/login'
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                currLocation.pathname === '/login'
                  ? 'bg-[#E23774] text-white shadow-md shadow-rose-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {isHomePage && (
        <div className='border-t border-gray-100 px-4 sm:px-6 py-4 bg-white/50'>
          <div className='mx-auto max-w-2xl'>
            <div className='flex items-center gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm shadow-gray-100 px-4 py-3 focus-within:border-[#E23774]/30 focus-within:shadow-md focus-within:shadow-rose-100/50 transition-all duration-200'>
              <div className='flex items-center gap-2 pr-3 border-r border-gray-200'>
                <BiMapPin className='h-5 w-5 text-[#E23774]' />
                <span className='text-sm font-medium text-gray-700 truncate max-w-[100px]'>
                  {city || 'Detecting location...'}
                </span>
              </div>
              <div className='flex flex-1 items-center gap-3'>
                <BiSearch className='h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search for dishes or restaurants...'
                  className='w-full text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
