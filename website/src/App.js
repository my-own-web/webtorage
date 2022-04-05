import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InfoProvider } from './components/InfoContext';
import Webpage from './components/Webpage';
import Login from './components/Login';

function App() {
  return (
    <InfoProvider >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Webpage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </InfoProvider>
  );
}

export default App;
