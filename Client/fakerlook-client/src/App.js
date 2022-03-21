import React, { useCallback, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProfileComponent from './components/ProfileComponent';
import LoginComponent from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import MapView from './views/Map/MapView';
import './App.css';
import { useDispatch } from "react-redux";
import { fetchUser } from "./Store/actions/user";

function App() {
  const dispatch = useDispatch();

  const loadData = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData])

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
