import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import ProfileComponent from './components/ProfileComponent';
import LoginComponent from './views/Login/LoginView';
import RegisterView from './views/Register/RegisterView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/map" element={<HomeComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />

      </Routes>
    </Router>
  );
}

export default App;
