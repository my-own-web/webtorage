import logo from './logo.svg';
import './App.css';
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
