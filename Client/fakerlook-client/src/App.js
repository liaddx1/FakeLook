import React, { useCallback, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogInView from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import MapView from './views/Map/MapView';
import { useDispatch } from "react-redux";
import { fetchUser } from "./Store/actions/user";
import './App.css';

function App() {
  const dispatch = useDispatch();

  const loadData = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData])


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LogInView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LogInView />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/home" element={<MapView />} />
          {/* <Route path="/profile" element={<LogInView />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
