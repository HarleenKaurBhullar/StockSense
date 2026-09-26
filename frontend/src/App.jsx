import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Auth from "./components/Auth";

import Dashboard from "./pages/Dashboard";
import Warehouse from "./pages/Warehouse";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Location from "./pages/Location";
import Receipt from "./pages/Receipt";
import ReceiptForm from "./pages/ReceiptForm";
import Deliveries from "./pages/Deliveries";
import DeliveryForm from "./pages/DeliveryForm";
import MoveHistory from "./pages/MoveHistory";
import Settings from "./pages/Settings";

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

        {/* Authentication */}
        <Route path="/login" element={<Auth />} />

        {/* Protected application pages */}
        <Route element={<ProtectedLayout />}>

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Inventory Structure */}
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/location" element={<Location />} />

          {/* Products & Stock */}
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />

          {/* Receipts */}
          <Route path="/receipts" element={<Receipt />} />
          <Route path="/receipts/new" element={<ReceiptForm />} />

          {/* Deliveries */}
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/deliveries/new" element={<DeliveryForm />} />

          {/* Move History */}
          <Route path="/move-history" element={<MoveHistory />} />

          {/* Settings / Profile */}
          <Route path="/settings" element={<Settings />} />

        </Route>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;