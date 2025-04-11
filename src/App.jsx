import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllStories from './pages/AllStories';
import About from './pages/About';

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<AllStories />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="bg-primary text-white p-4 text-center">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} News Drop Isle of Wight</p>
        </div>
      </footer>
    </>
  );
}

export default App;
