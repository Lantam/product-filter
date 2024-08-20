import React, { createContext, useRef, useReducer, useContext, useCallback } from 'react';

interface AccordionContextProps {
  openSections: { [key: string]: boolean };
  toggleSection: (key: string) => void;
  openSection: (key: string) => void;
  sectionRefs: { [key: string]: HTMLDivElement | null };
}

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within an AccordionProvider');
  }
  return context;
};

type Action = 
  | { type: 'TOGGLE_SECTION'; key: string }
  | { type: 'OPEN_SECTION'; key: string };

const accordionReducer = (state: { [key: string]: boolean }, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_SECTION':
      return { ...state, [action.key]: !state[action.key] };
    case 'OPEN_SECTION':
      return { ...state, [action.key]: true };
    default:
      return state;
  }
};

interface AccordionProviderProps {
  children: React.ReactNode;
}

export const AccordionProvider: React.FC<AccordionProviderProps> = ({ children }) => {
  const [openSections, dispatch] = useReducer(accordionReducer, {});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}).current;

  const toggleSection = useCallback((key: string) => {
    dispatch({ type: 'TOGGLE_SECTION', key });
  }, []);

  const openSection = useCallback((key: string) => {
    dispatch({ type: 'OPEN_SECTION', key });
  }, []);

  const value = {
    openSections,
    toggleSection,
    openSection,
    sectionRefs,
  };

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};
