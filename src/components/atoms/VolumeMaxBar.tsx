import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

interface VolumeBarProps {
  micVolume: number;
}

const VolumeMaxBar = (props: VolumeBarProps) => {
  const { micVolume } = props;

  const time = useRef(100);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const [maxVolume, setMaxVolume] = useState<number>(0);
  const [currentVolume, setCurrentVolume] = useState<number>(0);

  useEffect(() => {
    if (micVolume > maxVolume) {
      setMaxVolume(micVolume);
      setCurrentVolume(micVolume);
    }
  }, [micVolume]);

  useEffect(() => {
    timerId.current && clearInterval(timerId.current);

    timerId.current = setInterval(() => {
      if (currentVolume >= 0) {
        const nextVolume = currentVolume - 0.08;
        setCurrentVolume(nextVolume);
        setMaxVolume(nextVolume);
        time.current -= 1;
      }
    }, 3);

    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, [maxVolume]);

  return <StyledBarMax fill={currentVolume} />;
};

const StyledBarMax = styled.div<{ fill: number }>`
  position: absolute;
  background: #ff0000;
  width: ${({ fill }) => `${fill - 1}%;`};
  height: 100%;
  top: 0;
`;

export default VolumeMaxBar;
