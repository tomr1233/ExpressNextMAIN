// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login'; // Make sure you import your login component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      {/* Public / Login route */}
      <Route path="/login" element={<Login />} />

      {/* Private / App route */}
      <Route path="/*" element={<App />} />
      {/* 
        You could also do `<Route path="/" element={<App />}>` 
        depending on how you want to structure your app’s URLs.
      */}
    </Routes>
  </BrowserRouter>
);
