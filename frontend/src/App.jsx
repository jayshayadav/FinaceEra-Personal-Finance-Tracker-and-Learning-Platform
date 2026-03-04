
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layout/Layout";
import Account from "./pages/Account";
import { useEffect } from "react";
import useTheme from "./hooks/useTheme";
// Learning
import LearningList from "./pages/Learning/LearningList";
import SingleTutorial from "./pages/Learning/SingleTutorial";

function App() {
   const { initTheme } = useTheme();

  useEffect(() => {
    initTheme();
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* PROTECTED + LAYOUT */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* 🔥 LEARNING ROUTES */}
            <Route path="/learning" element={<LearningList />} />
            <Route path="/tutorial/:id" element={<SingleTutorial />} />
            <Route path="/accounts" element={<Account />} />

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
