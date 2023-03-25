import React from 'react';
import Webpage from './components/Webpage';
import { InfoProvider } from './components/InfoContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import CreatePage from './components/CreatePage';
import SignupPage from './components/SignupPage';

function App() {
  return (
    <InfoProvider >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Webpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/changePassword' element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </InfoProvider>
  );
}

export default App;
