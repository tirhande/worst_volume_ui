import React, { useCallback, useState } from 'react';
import { notify } from '@lib/notfiy';
import { MicVolume } from './MicVolume';

const MicVolumePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [onFrameId, setOnFrameId] = useState<number | null>(null);
  // let onFrameId = null;

  const [volume, setVolume] = useState<number>(0);

  const [volumeBar, setVolumeBar] = useState<string[]>(Array.from({ length: 10 }, () => '#E6E6E6'));

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setIsRecording(true);
        setAudioStream(stream);

        const context = new AudioContext();
        const analyser = context.createAnalyser();
        const mediaStreamAudioSourceNode = context.createMediaStreamSource(stream);
        mediaStreamAudioSourceNode.connect(analyser, 0);
        const pcmData = new Float32Array(analyser.fftSize);

        const onFrame = () => {
          analyser.getFloatTimeDomainData(pcmData);
          const sum = pcmData.reduce((acc, cur) => {
            acc += cur * cur;

            return acc;
          }, 0.0);
          const rms = Math.sqrt(sum / pcmData.length);
          const normalizedVolume = Math.min(1, rms / 0.5);
          colorVolumeMeter(normalizedVolume * 2);
          setOnFrameId(requestAnimationFrame(onFrame));
        };

        setOnFrameId(requestAnimationFrame(onFrame));
      })
      .catch((error) => {
        notify.error(`마이크 권한 획득 실패, ${error}`);
      });
  };

  const stopRecording = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      if (onFrameId) cancelAnimationFrame(onFrameId);
    }

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  }, [isRecording, audioStream]);

  const normalizeToInteger = (volume: number, min: number, max: number) => {
    const scaledValue = Math.min(max, Math.max(min, volume * (max - min) + min));

    return Math.round(scaledValue);
  };

  const colorVolumeMeter = (vol: number) => {
    const VOL_METER_MAX = 100;

    const currentVol = normalizeToInteger(vol, 0, VOL_METER_MAX);

    handleChangeVolume(currentVol);
    // setVolume(currentVol);
    // setVolumeBar(volumeBar.map((_, idx) => (idx < numberOfChildToColor ? '#4F4FFB' : '#E6E6E6')));
  };

  const handleOnStartClick = () => {
    startRecording();
  };
  const handleOnStopClick = () => {
    stopRecording();
  };

  const [throttle, setThrottle] = useState(false);

  const handleChangeVolume = (value: number) => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(async () => {
        setVolume(value);
        setThrottle(false);
      }, 1000);
    }
  };

  return <MicVolume onStartClick={handleOnStartClick} onStopClick={handleOnStopClick} volume={volume} />;
};

export default MicVolumePage;
