import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './main.css';
import Loader from './components/Shared/Loader';
import { AuthProvider } from './context/AuthContext';
const Root = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
      return;
    }
    const onLoad = () => setIsLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900">
          <Loader size="xl" color="blue" />
        </div>
      )}
      <AuthProvider><App /></AuthProvider>
      
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
