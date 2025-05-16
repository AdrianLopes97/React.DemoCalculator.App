import React, { useState } from 'react';
import CalculatorButton from '../CalculatorButton';
import './index.css';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForSecondValue) {
      setDisplayValue(num);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (firstValue === null) {
      setFirstValue(displayValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstValue(String(result));
    }
    setWaitingForSecondValue(true);
    setOperator(op);
  };

  const performCalculation = () => {
    const prevValue = parseFloat(firstValue!);
    const currentValue = parseFloat(displayValue);
    if (operator === '+') return prevValue + currentValue;
    if (operator === '-') return prevValue - currentValue;
    if (operator === '*') return prevValue * currentValue;
    if (operator === '/') return prevValue / currentValue;
    return currentValue;
  };

  const handleEqualClick = () => {
    if (operator && firstValue) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue(null);
    setWaitingForSecondValue(false);
  };

  const handleDecimalClick = () => {
    if (waitingForSecondValue) {
        setDisplayValue('0.');
        setWaitingForSecondValue(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handlePlusMinusClick = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const handlePercentageClick = () => {
    setDisplayValue((parseFloat(displayValue) / 100).toString());
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <CalculatorButton label="AC" onClick={handleClearClick} className="operator" />
        <CalculatorButton label="+/-" onClick={handlePlusMinusClick} className="operator" />
        <CalculatorButton label="%" onClick={handlePercentageClick} className="operator" />
        <CalculatorButton label="/" onClick={() => handleOperatorClick('/')} className="operator" />

        <CalculatorButton label="7" onClick={() => handleNumberClick('7')} />
        <CalculatorButton label="8" onClick={() => handleNumberClick('8')} />
        <CalculatorButton label="9" onClick={() => handleNumberClick('9')} />
        <CalculatorButton label="*" onClick={() => handleOperatorClick('*')} className="operator" />

        <CalculatorButton label="4" onClick={() => handleNumberClick('4')} />
        <CalculatorButton label="5" onClick={() => handleNumberClick('5')} />
        <CalculatorButton label="6" onClick={() => handleNumberClick('6')} />
        <CalculatorButton label="-" onClick={() => handleOperatorClick('-')} className="operator" />

        <CalculatorButton label="1" onClick={() => handleNumberClick('1')} />
        <CalculatorButton label="2" onClick={() => handleNumberClick('2')} />
        <CalculatorButton label="3" onClick={() => handleNumberClick('3')} />
        <CalculatorButton label="+" onClick={() => handleOperatorClick('+')} className="operator" />

        <CalculatorButton label="0" onClick={() => handleNumberClick('0')} className="zero"/>
        <CalculatorButton label="." onClick={handleDecimalClick} />
        <CalculatorButton label="=" onClick={handleEqualClick} className="operator" />
      </div>
    </div>
  );
};

export default Calculator;