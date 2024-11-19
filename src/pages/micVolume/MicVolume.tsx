import React from 'react';
import styled from '@emotion/styled';
import VolumeBar from '@components/blocks/VolumeBar';

interface MicVolumeProps {
  onStartClick: () => void;
  onStopClick: () => void;
  // volumeBar: string[];
  volume: number;
}

export const MicVolume = (props: MicVolumeProps) => {
  const { onStartClick, onStopClick, volume } = props;

  return (
    <StyeldContainer>
      <StyeldButtonWrapper>
        <button onClick={onStartClick}>Start</button>
        <button onClick={onStopClick}>Stop</button>
      </StyeldButtonWrapper>
      {/* <StyeldVolumeWrapper>
        {volumeBar.map((bar, idx) => (
          <StyledVolumBar key={idx} bgColor={bar} />
        ))}
      </StyeldVolumeWrapper> */}
      <VolumeBar volume={volume} />
    </StyeldContainer>
  );
};

const StyeldContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const StyeldButtonWrapper = styled.div`
  display: flex;
  width: 150px;
  height: 20px;

  justify-content: center;
  gap: 4px;
`;
const StyeldVolumeWrapper = styled.div`
  /* display: flex;
  width: 150px;
  height: 20px;
  gap: 4px; */
`;

const StyledVolumBar = styled.div<{ bgColor: string }>`
  width: 8%;
  border-radius: 4px;
  background-color: ${({ bgColor }) => bgColor};
`;
