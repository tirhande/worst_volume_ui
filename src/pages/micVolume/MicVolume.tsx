import React from 'react';
import styled from '@emotion/styled';
import VolumeBar from '@components/atoms/VolumeBar';
import { Link } from 'react-router-dom';
import { StyledWrapper } from '@styles/common';

interface MicVolumeProps {
  onStartClick: () => void;
  onStopClick: () => void;
  volume: number;
}

export const MicVolume = (props: MicVolumeProps) => {
  const { onStartClick, onStopClick, volume } = props;

  return (
    <StyledWrapper>
      <VolumeBar micVolume={volume} isAutoDecreaseVolume={true} />
      <StyeldButtonContainer>
        <button onClick={onStartClick}>Start</button>
        <button onClick={onStopClick}>Stop</button>
        <Link to="/">
          <button>집으로</button>
        </Link>
      </StyeldButtonContainer>
    </StyledWrapper>
  );
};

const StyeldButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  gap: 15px;
`;
