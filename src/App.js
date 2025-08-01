import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Homepage from './Pages/Homepage/Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App