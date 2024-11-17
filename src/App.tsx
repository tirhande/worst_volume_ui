import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router';
import IntroPage from '@pages/Intro';
import NotFoundPage from '@pages/notFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
