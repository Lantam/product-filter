import React, { useEffect } from 'react';
import AccordionSection from './AccordionSection';
import { AccordionConfig } from './AccordionConfig';
import { AccordionProvider, useAccordionContext } from './AccordionContext';
import useScrollToSection from '../hooks/useScrollToSection';

interface DynamicAccordionProps {
  config: AccordionConfig[];
  product: any;
}

const DynamicAccordionContent: React.FC<DynamicAccordionProps> = ({ config, product }) => {
  const { openSections, toggleSection, openSection } = useAccordionContext();
  const { scrollTargetRef, scrollToSection } = useScrollToSection();

  useEffect(() => {
    if (scrollTargetRef.current) {
      openSection(scrollTargetRef.current);
      scrollToSection(scrollTargetRef.current);
      scrollTargetRef.current = null;
    }
  }, [scrollTargetRef, openSection, scrollToSection]);

  return (
    <div className="container mx-auto p-4">
      {config.map(({ key, title, content }, index) => {
        return (
          <AccordionSection
            key={key}
            id={key}
            title={title}
            isOpen={openSections[key]}
            onToggle={() => toggleSection(key)}
            isLast={index === config.length - 1}
          >
            {content(product)}
          </AccordionSection>
        )
      })}
    </div>
  );
};

const DynamicAccordion: React.FC<DynamicAccordionProps> = (props) => (
  <AccordionProvider>
    <DynamicAccordionContent {...props} />
  </AccordionProvider>
);

export default DynamicAccordion;
