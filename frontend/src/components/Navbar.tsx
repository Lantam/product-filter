import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Account, Cart } from '../assets/icons';
import { Logo } from '../assets/logo';
import SearchBar from './SearchBar';
import { ThemeContext } from './ThemeContext';

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const updateNavbarHeight = () => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    updateNavbarHeight();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavbarHeight);

    const resizeObserver = new ResizeObserver(updateNavbarHeight);
    if (navbarRef.current) {
      resizeObserver.observe(navbarRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed top-0 w-full z-10 ${isSticky ? 'bg-zinc-200 dark:bg-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'} transition-colors duration-300 overflow-hidden`}
      >
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between gap-8 pt-2 sm:pt-4 pb-2 sm:pb-4'>
            <div className='flex items-center pl-4 sm:pl-8 cursor-pointer'>
              <Link to='/' className='text-zinc-800 dark:text-rose-600 transition-colors duration-300'>
                <Logo />
              </Link>
            </div>
            <div className='flex items-center pr-4 sm:pr-8'>
              <div className='flex flex-row sm:pl-16 gap-8'>
                <div className='flex gap-1 max-h-10'>
                  <div className={`hidden sm:flex items-center text-zinc-800 dark:text-white transition-all duration-300 text-xl cursor-pointer`}>
                    <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
                  </div>
                  <div className='flex items-center rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 text-xl p-1.5 cursor-pointer'>
                    <Link to='/shopping-cart' className='text-zinc-800 dark:text-white transition-colors duration-300'><Cart className='h-7' /></Link>
                  </div>
                  <div className='flex items-center rounded-full hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 text-xl p-1.5 cursor-pointer'>
                    <Link to='/account' className='text-zinc-800 dark:text-white transition-colors duration-300'><Account className='h-7' /></Link>
                  </div>
                </div>
                <div className='hidden lg:flex items-center'>
                  <div className='flex items-center gap-4'>
                    <label>
                      <input
                        type="checkbox"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="border-0 [clip:rect(0px,0px,0px,0px)] h-1 w-1 p-0 overflow-hidden whitespace-nowrap absolute"
                        />
                      <div className='flex flex-col border bg-white dark:bg-stone-900 border-black dark:border-zinc-700 px-1 py-0.5 w-12 leading-none rounded-full transition-colors duration-300 cursor-pointer'>
                        <div className='w-4 h-4 rounded-full border leading-none dark:translate-x-[22px] border-black bg-rose-600'></div>
                      </div>
                    </label>
                    <label className='text-base font-medium text-zinc-800 dark:text-white transition-colors text-nowrap duration-300'>{theme === 'dark' ? <span>Dark theme</span> : <span>Light theme</span>}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex sm:hidden items-center text-zinc-800 dark:text-white px-3 pb-5 transition-all duration-300 text-xl cursor-pointer'>
            <SearchBar isOpen={true} setIsOpen={setIsSearchOpen} />
          </div>
        </div>
      </nav>
      <div className={ `h-[${navbarHeight}px]` } style={{ height: `${navbarHeight}px` }}></div>
    </>
  );
};

export default Navbar;