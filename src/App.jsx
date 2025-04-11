import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllStories from './pages/AllStories';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen bg-primary text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<AllStories />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
