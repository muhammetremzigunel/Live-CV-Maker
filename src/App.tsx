import { CvDataProvider } from './context/CvDataContext';
import { CvUiProvider } from './context/CvUiContext';
import { AppLayout } from './ui/AppLayout';
import './App.css';

function App() {
  return (
    <CvDataProvider>
      <CvUiProvider>
        <AppLayout />
      </CvUiProvider>
    </CvDataProvider>
  );
}

export default App;
