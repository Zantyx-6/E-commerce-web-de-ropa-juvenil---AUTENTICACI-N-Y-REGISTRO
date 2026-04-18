import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks";

interface Props {
  children: ReactNode;
}

export default function MainStoreLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/home" className="text-xl font-extrabold text-slate-900">
              VibePulse
            </Link>
            <nav className="hidden gap-2 sm:flex">
              <Link className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" to="/home">
                Inicio
              </Link>
              <Link
                className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100"
                to="/catalogo"
              >
                Catálogo
              </Link>
              <Link className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" to="/cart">
                Carrito
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100"
                  to="/admin"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/catalogo")}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Comprar
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-md border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Carrito
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={logout}
              className="rounded-md border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
