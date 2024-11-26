import { StyledMain } from '@styles/common';
import { Toaster } from 'react-hot-toast';
import { WaterFaucet } from './WaterFaucet';
import { useEffect, useRef, useState } from 'react';
import { notify } from '@lib/notfiy';

const WaterFaucetPage = () => {
  const [volume, setVolume] = useState<number>(0);
  const [isOpenedFaucet, setOpenFaucet] = useState<boolean>(false);

  const time = useRef(100);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleOnClick = () => {
    setOpenFaucet((prev) => !prev);
  };

  const getSetInterval = (additional: number, ms: number = 50) => {
    return setInterval(() => {
      const nextVolume = volume + additional;
      setVolume(nextVolume);
      time.current -= 1;
    }, ms);
  };

  useEffect(() => {
    timerId.current && clearInterval(timerId.current);

    if (isOpenedFaucet && volume < 100) {
      timerId.current = getSetInterval(0.5, 50);
    } else if (!isOpenedFaucet && volume > 0) {
      timerId.current = getSetInterval(-1, 25);
    } else if (isOpenedFaucet && volume === 100) {
      setVolume(0);
      notify.error('Overflowing Water!');
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
