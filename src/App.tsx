import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";
import CreateTrip from "./pages/CreateTrip";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </Router>
  );
}

export default App;
