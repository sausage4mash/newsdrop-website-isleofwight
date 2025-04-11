import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-20" />
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
