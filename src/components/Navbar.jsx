import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // Get the base URL from Vite's environment variables
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  return (
    <nav className="bg-primary text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          {/* Use the baseUrl to prefix the image path */}
          <img src={`${baseUrl}logo.png`} alt="Logo" className="h-20" />
          <span className="text-2xl font-bold">Breaking News</span>
        </Link>
        <div className="space-x-6 text-lg">
          <Link to="/">Home</Link>
          <Link to="/stories">All Stories</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}