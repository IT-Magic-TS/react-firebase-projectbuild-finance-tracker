import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import { useAuthcontext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthcontext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate replace to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate replace to="/" />}
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
