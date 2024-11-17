import React, { useCallback, useState } from 'react';
import { notify } from '@lib/notfiy';
import { MicVolume } from './MicVolume';

const MicVolumePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  // let onFrameId = null;

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
          let sum = 0.0;
          for (const amplitude of pcmData) {
            sum += amplitude * amplitude;
          }
          const rms = Math.sqrt(sum / pcmData.length);
          const normalizedVolume = Math.min(1, rms / 0.5);
          colorVolumeMeter(normalizedVolume * 2);
          // onFrameId = window.requestAnimationFrame(onFrame);
        };

        // onFrameId = window.requestAnimationFrame(onFrame);
      })
      .catch((error) => {
        notify.error(`마이크 권한 획득 실패, ${error}`);
      });
  };

  const stopRecording = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      // if (onFrameId) window.cancelAnimationFrame(onFrameId);
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
    const VOL_METER_MAX = 10;
    // const childrens = document.querySelectorAll(".volumeBar");

    // childrens.forEach((child) => {
    //   child.style.backgroundColor = "#e6e6e6";
    // });

    const numberOfChildToColor = normalizeToInteger(vol, 0, VOL_METER_MAX);
    // const coloredChild = Array.from(childrens).slice(0, numberOfChildToColor);

    // coloredChild.forEach((child) => {
    //   child.style.backgroundColor = "#4F4FFB";
    // });
  };

  // document.querySelector("#start").addEventListener("click", startRecording);
  // document.querySelector("#stop").addEventListener("click", stopRecording);
  const handleOnStartClick = () => {
    startRecording();
  };
  const handleOnStopClick = () => {
    stopRecording();
  };

  return <MicVolume />;
};

export default MicVolumePage;
