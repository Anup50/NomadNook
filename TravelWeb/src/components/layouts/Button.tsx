import React from 'react';

interface ButtonProps {
  title: string;
  backgroundColor?: string; // Optional background color
  onClick?: () => void; // Optional onClick function
}

const Button: React.FC<ButtonProps> = ({ title, backgroundColor, onClick }) => {
  return (
    <button onClick={onClick} className={`${backgroundColor} text-black rounded-full px-8 font-medium hover:bg-black hover:text-white transition-all`}>
      {title}
    </button>
  );
};

export default Button;
