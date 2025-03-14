import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Calendar from './components/calendar';
import PrivacyPolicy from './components/privacyPolicy';


const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Add this wrapper */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/user/:id" element={<Calendar />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
