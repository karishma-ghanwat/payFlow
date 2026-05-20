import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

// ✅ Protected Route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// ✅ Public Route (block if already logged in)
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* FIRST VISIT */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* AUTH */}
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* PROTECTED */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />

        {/* STATUS */}
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;