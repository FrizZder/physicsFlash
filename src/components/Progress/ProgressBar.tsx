import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  progress: number; // от 0 до 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 10,
  color = 'var(--primary-color)',
  backgroundColor = 'rgba(74, 107, 255, 0.1)',
  showPercentage = true,
  label
}) => {
  // Убедимся, что прогресс в диапазоне от 0 до 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <ProgressContainer>
      {label && <ProgressLabel>{label}</ProgressLabel>}
      <ProgressWrapper height={height} backgroundColor={backgroundColor}>
        <ProgressFill progress={normalizedProgress} color={color} />
        {showPercentage && (
          <ProgressText progress={normalizedProgress}>
            {normalizedProgress}%
          </ProgressText>
        )}
      </ProgressWrapper>
    </ProgressContainer>
  );
};

// Стилизованные компоненты
const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const ProgressLabel = styled.div`
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: var(--light-text-color);
`;

const ProgressWrapper = styled.div<{ height: number; backgroundColor: string }>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.height / 2}px;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number; color: string }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.color};
  border-radius: inherit;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.span<{ progress: number }>`
  position: absolute;
  right: ${props => props.progress < 10 ? '5px' : 'auto'};
  left: ${props => props.progress < 10 ? 'auto' : '50%'};
  top: 50%;
  transform: ${props => props.progress < 10 ? 'translateY(-50%)' : 'translate(-50%, -50%)'};
  color: ${props => props.progress > 30 ? 'white' : 'var(--text-color)'};
  font-size: 0.75rem;
  font-weight: 600;
`;

export default ProgressBar; 