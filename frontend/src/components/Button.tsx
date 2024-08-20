import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-green-500 hover:bg-white text-white hover:text-black border-2 border-green-500 hover:border-white py-2 px-4 rounded-full transition duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;