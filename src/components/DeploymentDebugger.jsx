import { useState, useEffect } from 'react';

const DeploymentDebugger = () => {
  const [info, setInfo] = useState({
    pathname: '',
    hostname: '',
    fullUrl: '',
    baseUrl: import.meta.env.BASE_URL || '/',
    mode: import.meta.env.MODE,
    assetLoaded: false
  });
  
  useEffect(() => {
    // Check if we can load the logo
    const img = new Image();
    img.onload = () => setInfo(prev => ({ ...prev, assetLoaded: true }));
    img.onerror = () => setInfo(prev => ({ ...prev, assetLoaded: false }));
    img.src = '/logo.png';
    
    // Get path information
    setInfo(prev => ({
      ...prev,
      pathname: window.location.pathname,
      hostname: window.location.hostname,
      fullUrl: window.location.href
    }));
  }, []);

  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Deployment Debug Info</h2>
      
      <div className="space-y-2">
        <div><span className="font-semibold">Current Base URL:</span> {info.baseUrl}</div>
        <div><span className="font-semibold">Current Path:</span> {info.pathname}</div>
        <div><span className="font-semibold">Hostname:</span> {info.hostname}</div>
        <div><span className="font-semibold">Full URL:</span> {info.fullUrl}</div>
        <div><span className="font-semibold">Environment Mode:</span> {info.mode}</div>
        <div>
          <span className="font-semibold">Logo Image Test:</span> 
          {info.assetLoaded ? 
            <span className="text-green-600 ml-1">✓ Loaded successfully</span> : 
            <span className="text-red-600 ml-1">✗ Failed to load</span>
          }
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Recommended Fixes:</h3>
          <ul className="list-disc ml-5 mt-2">
            <li>Make sure your BrowserRouter has a basename matching your base path</li>
            <li>Check asset paths (images, etc.) - they may need to be prefixed with the base URL</li>
            <li>Confirm that your vite.config.js base setting matches your deployment path</li>
            <li>For GitHub Pages, ensure the repository name matches the base path</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDebugger;