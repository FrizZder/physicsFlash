import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
// Using import with type declaration from our custom .d.ts file
// @ts-ignore
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

const MathFormula: React.FC<MathFormulaProps> = ({ 
  formula, 
  displayMode = false, 
  className 
}) => {
  const formulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formulaRef.current) {
      try {
        katex.render(formula, formulaRef.current, {
          displayMode: displayMode,
          throwOnError: false,
          errorColor: '#f44336',
          macros: {
            '\\F': '\\mathcal{F}'
          }
        });
      } catch (error) {
        console.error('Ошибка отображения формулы:', error);
        if (formulaRef.current) {
          formulaRef.current.textContent = `Ошибка отображения формулы: ${formula}`;
        }
      }
    }
  }, [formula, displayMode]);

  return (
    <FormulaContainer 
      ref={formulaRef} 
      className={className} 
      isDisplay={displayMode}
    />
  );
};

const FormulaContainer = styled.div<{ isDisplay: boolean }>`
  font-family: 'KaTeX_Math', serif;
  margin: ${props => props.isDisplay ? '1.5rem 0' : '0'};
  text-align: ${props => props.isDisplay ? 'center' : 'inherit'};
  overflow-x: auto;
  padding: ${props => props.isDisplay ? '1rem' : '0.25rem'};
  background-color: ${props => props.isDisplay ? 'rgba(0, 0, 0, 0.03)' : 'transparent'};
  border-radius: 8px;
  
  &:hover {
    background-color: ${props => props.isDisplay ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  }
`;

export default MathFormula; 