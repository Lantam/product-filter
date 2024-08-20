export interface AccordionSectionType {
    id: string;
    title: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    isLast: boolean;
    onToggle: () => void;
  }