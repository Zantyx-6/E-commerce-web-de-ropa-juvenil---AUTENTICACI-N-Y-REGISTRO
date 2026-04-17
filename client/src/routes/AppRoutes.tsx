import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { getAuth } from "../utils/auth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" replace />;
  if (auth.role !== "ADMIN") return <Navigate to="/home" replace />;
  return children;
}

function GuestOnly({ children }: { children: JSX.Element }) {
  const auth = getAuth();
  if (auth) return <Navigate to={auth.role === "ADMIN" ? "/admin" : "/home"} replace />;
  return children;
}

function RootRedirect() {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" replace />;
  return <Navigate to={auth.role === "ADMIN" ? "/admin" : "/home"} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route path="/catalogo" element={<RequireAuth><Catalog /></RequireAuth>} />
      <Route path="/producto/:id" element={<RequireAuth><ProductDetail /></RequireAuth>} />
      <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
