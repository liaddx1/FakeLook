import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProfileComponent from './components/ProfileComponent';
import LoginComponent from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import MapView from './views/Map/MapView';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
