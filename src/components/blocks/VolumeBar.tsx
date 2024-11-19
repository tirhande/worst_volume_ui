import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface VolumeBarProps {
  volume: number;
}

type MouseEvent = React.MouseEvent<HTMLInputElement>;

const VolumeBar = (props: VolumeBarProps) => {
  const { volume } = props;

  const [value, setValue] = useState<number>(volume);
  const [fillWidth, setFillWidth] = useState<number>(0);
  const [isStillDown, setIsStillDown] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    changeVolume(volume);
  }, [volume]);

  const changeVolume = useCallback((val: number) => {
    setFillWidth(val);
    setValue(val);
  }, []);

  const calculateFill = (e: MouseEvent) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetWidth = divRef.current?.offsetWidth ?? 0;
    const width = offsetWidth - 30;
    const val = Math.max(Math.min(((offsetX - 15) / width) * 100.0, 100.0), 0);

    changeVolume(val);
  };

  const onMouseDown = (e: MouseEvent) => {
    setIsStillDown(true);
    calculateFill(e);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (isStillDown) calculateFill(e);
  };
  const onMouseUp = () => {
    setIsStillDown(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <StyledWrapper onMouseUp={onMouseUp}>
      <StyledInput type="range" min="0" max="100" value={value} readOnly />
      <FontAwesomeIcon icon={faVolumeUp} style={{ fontSize: '1.5rem' }} />
      <StyledHoverBox ref={divRef} onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
        <StyledBar>
          <StyledBarFill fillWidth={fillWidth} />
        </StyledBar>
      </StyledHoverBox>
    </StyledWrapper>
  );
};

const StyledInput = styled.input`
  display: none;
`;
const StyledHoverBox = styled.div`
  padding: 10px 15px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
const StyledBar = styled.div`
  background: #999;
  height: 7px;
  width: 120px;
  border-radius: 15px;
  overflow: hidden;
  pointer-events: none;
`;
const StyledBarFill = styled.div<{ fillWidth: number }>`
  background: #0095ff;
  width: ${({ fillWidth }) => `${fillWidth}%;`};
  height: 100%;
  background-clip: border-box;
  pointer-events: none;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default VolumeBar;
