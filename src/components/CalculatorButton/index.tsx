import React from 'react';
import './index.css';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, className }) => {
  return (
    <button className={`calculator-button ${className || ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default CalculatorButton;