import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import IntroPage from '@pages/Intro';
import MicVolumePage from '@pages/micVolume';
import NotFoundPage from '@pages/notFound';
import LocationPage from '@pages/location';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/mic-volume" element={<MicVolumePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
