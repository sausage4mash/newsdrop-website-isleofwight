import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* Inline SVG logo instead of external image */}
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="#1ABC9C" />
            <path d="M15 15 L25 20 L15 25 Z" fill="white" />
          </svg>
          <span className="text-xl font-bold">News Drop IoW</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/stories" className="hover:text-accent transition-colors">All Stories</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 p-2 flex flex-col space-y-2">
          <Link to="/" className="py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/stories" className="py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>All Stories</Link>
          <Link to="/about" className="py-2 hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  );
}
