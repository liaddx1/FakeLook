import React, { useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LogInView from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';
import MapView from './views/Map/MapView';
import ForgotPasswordView from './views/ForgotPassword/ForgotPasswordView';
import { useDispatch } from "react-redux";
import { fetchUsers } from "./Store/actions/user";
import { fetchPosts } from "./Store/actions/post";
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState();

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });
  }, [loadData])


  return (
    isLoading ? (<div><h1 className="text-center">Our Servers Are Currently Down, Try Again Later!</h1></div>) :
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LogInView />} />
            <Route path="/Register" element={<RegisterView />} />
            <Route path="/Login" element={<LogInView />} />
            <Route path="/Map" element={<MapView />} />
            <Route path="/ForgotPassword" element={<ForgotPasswordView />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
