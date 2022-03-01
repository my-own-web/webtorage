import React from 'react';
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
