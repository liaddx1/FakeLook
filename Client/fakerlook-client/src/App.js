import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import RegisterComponent from './components/RegisterComponent';
import ProfileComponent from './components/ProfileComponent';
import LoginComponent from './views/Login/LoginView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/map" element={<HomeComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />

      </Routes>
    </Router>
  );
}

export default App;
