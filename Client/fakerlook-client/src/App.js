import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import LogInComponent from './components/LogInComponent';
import RegisterComponent from './components/RegisterComponent';
import ProfileComponent from './components/ProfileComponent';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />
      
      </Routes>
    </Router>
  );
}

export default App;
