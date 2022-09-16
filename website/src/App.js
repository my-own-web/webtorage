import React from 'react';
import Webpage from './components/Webpage';
import { InfoProvider } from './components/InfoContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreatePage from './components/CreatePage';

function App() {
  return (
    <InfoProvider >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Webpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </InfoProvider>
  );
}

export default App;
