import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/Form';
import RenderedOutput from './components/RenderedOutput';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/output" element={<RenderedOutput />} />
        <Route path="/" element={<FormPage />} /> {/* Change default to FormPage */}
      </Routes>
    </Router>
  );
}

export default App;
