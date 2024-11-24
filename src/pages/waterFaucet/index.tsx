import { StyledMain } from '@styles/common';
import { Toaster } from 'react-hot-toast';
import { WaterFaucet } from './WaterFaucet';
import { useEffect, useRef, useState } from 'react';

const WaterFaucetPage = () => {
  const [volume, setVolume] = useState<number>(0);
  const [isOpenedFaucet, setOpenFaucet] = useState<boolean>(false);

  const time = useRef(100);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleOnClick = () => {
    setOpenFaucet((prev) => !prev);
  };

  useEffect(() => {
    timerId.current && clearInterval(timerId.current);

    if (isOpenedFaucet && volume <= 100) {
      timerId.current = setInterval(() => {
        const nextVolume = volume + 0.5;
        setVolume(nextVolume);
        time.current -= 1;
      }, 50);
    } else if (!isOpenedFaucet && volume > 0) {
      timerId.current = setInterval(() => {
        const nextVolume = volume - 1;
        setVolume(nextVolume);
        time.current -= 1;
      }, 25);
    }

    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, [isOpenedFaucet, volume]);

  return (
    <StyledMain>
      <WaterFaucet
        onClick={handleOnClick}
        isOpened={isOpenedFaucet}
        volume={volume}
      />
      <Toaster />
    </StyledMain>
  );
};

export default WaterFaucetPage;
