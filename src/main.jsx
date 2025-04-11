import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsApp from './NewsApp';
import './index.css'; // If you have any base CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewsApp />
  </React.StrictMode>
);
