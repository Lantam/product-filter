import React from 'react';
import { AccordionSectionType } from '../types/AccordionSection';

const AccordionSection: React.FC<AccordionSectionType> = ({ id, title, children, isOpen, onToggle, isLast }) => {
  return (
    <div id={id} className={`max-w-5xl border-t border-gray-300 dark:border-zinc-600 ${isLast ? 'border-b' : ''}`}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center w-full">
          {typeof title === 'string' ? <h2 className="text-lg font-medium">{title}</h2> : title}
        </div>
        <button className="focus:outline-none">
          <svg
            className={`w-6 h-6 text-black dark:text-zinc-400 transition-transform duration-300 ease-in-out transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="p-4 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
