<<<<<<< HEAD
import React from 'react';
=======
import logo from './logo.svg';
import './App.css';
>>>>>>> upstream/main
import Webpage from './components/Webpage';
import { InfoProvider } from './components/InfoContext';

function App() {
  return (
    <InfoProvider >
      <Webpage />
    </InfoProvider>
  );
}

export default App;
