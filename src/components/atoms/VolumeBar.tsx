import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import VolumeMaxBar from './VolumeMaxBar';

interface VolumeBarProps {
  micVolume: number;
  isAutoDecreaseVolume?: boolean;
}

const VolumeBar = (props: VolumeBarProps) => {
  const { micVolume, isAutoDecreaseVolume } = props;

  const [fillWidth, setFillWidth] = useState<number>(0);

  useEffect(() => {
    setFillWidth(micVolume);
  }, [micVolume]);

  return (
    <StyledContainer>
      <FontAwesomeIcon icon={faVolumeUp} style={{ fontSize: '1.5rem' }} />
      <StyledVolumeBarContainer>
        <StyledBarWrapper>
          <StyledBar fillWidth={fillWidth} />
          {isAutoDecreaseVolume && <VolumeMaxBar micVolume={micVolume} />}
        </StyledBarWrapper>
      </StyledVolumeBarContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledVolumeBarContainer = styled.div`
  padding: 10px 15px;
  opacity: 0.7;
  transition: opacity 0.2s;
`;
const StyledBarWrapper = styled.div`
  position: relative;
  background: #999;
  height: 8px;
  width: 200px;
  border-radius: 15px;
  overflow: hidden;
  pointer-events: none;
`;
const StyledBar = styled.div<{ fillWidth: number }>`
  position: absolute;
  background: #2234ff;
  width: ${({ fillWidth }) => `${fillWidth}%;`};
  height: 100%;
  z-index: 1;
`;

export default VolumeBar;
