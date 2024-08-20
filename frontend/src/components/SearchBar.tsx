import React, { useEffect, useRef } from 'react';
import { Search } from '../assets/icons';

interface SearchBarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className={`flex flex-row justify-between grow p-1.5 ${isOpen ? 'bg-white dark:bg-zinc-700' : 'hover:bg-white dark:hover:bg-zinc-700'} rounded-full transition-all duration-300`}>
      <input
        ref={inputRef}
        type="text"
        className={`bg-transparent placeholder-zinc-800 dark:placeholder-zinc-200 outline-none transition-all text-base font-medium duration-300 ${
          isOpen ? 'w-full sm:w-44 md:w-60 pl-1.5' : 'w-0'
        }`}
        placeholder="Search..."
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      />
      <button
        className='flex items-center transition-all duration-300'
        aria-label="Toggle Search"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className='h-7 text-zinc-800 dark:text-zinc-200 transition-colors duration-300' />
      </button>
    </div>
  );
};

export default SearchBar;