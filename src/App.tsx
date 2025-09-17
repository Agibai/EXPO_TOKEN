import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";
import Bookings from "./pages/Bookings";
import CreateTrip from "./pages/CreateTrip";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DriverTrips from "./pages/DriverTrips";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
  path="/driver-trips"
  element={
    <ProtectedRoute>
      <DriverTrips />
    </ProtectedRoute>
  }
/>
        <Route
  path="/driver-dashboard"
  element={
    <ProtectedRoute>
      <DriverDashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/driver-dashboard"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <DriverDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/driver-trips"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <DriverTrips />
    </ProtectedRoute>
  }
/>

<Route
  path="/trips"
  element={
    <ProtectedRoute allowedRoles={["passenger", "driver"]}>
      <Trips />
    </ProtectedRoute>
  }
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={["driver", "passenger"]}>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/payment-history"
  element={
    <ProtectedRoute allowedRoles={["passenger"]}>
      <PaymentHistory />
    </ProtectedRoute>
  }
/>
        <Route
  path="/driver-panel"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <DriverPanel />
    </ProtectedRoute>
  }
/>
        <Route
  path="/book-trip"
  element={
    <ProtectedRoute allowedRoles={["passenger"]}>
      <BookTrip />
    </ProtectedRoute>
  }
/>
        <Route
  path="/trips-list"
  element={
    <ProtectedRoute allowedRoles={["passenger"]}>
      <TripsList />
    </ProtectedRoute>
  }
/>
        <Route
  path="/my-bookings"
  element={
    <ProtectedRoute allowedRoles={["passenger"]}>
      <MyBookings />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
