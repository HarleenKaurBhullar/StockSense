import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Auth from "./components/Auth";

import Dashboard from "./pages/Dashboard";
import Warehouse from "./pages/Warehouse";
import Product from "./pages/Products";
import Stock from "./pages/Stock";

function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route path="/login" element={<Auth />} />

        {/* All authenticated pages */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/stock" element={<Stock />}/>
          {/* <Route path="/product" element={<Product/>}/> */}
          {/* Later you can add:
          <Route path="/operations" element={<Operations />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/move-history" element={<MoveHistory />} />
          <Route path="/settings" element={<Settings />} />
          */}
        </Route>

        {/* Anything unknown goes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;