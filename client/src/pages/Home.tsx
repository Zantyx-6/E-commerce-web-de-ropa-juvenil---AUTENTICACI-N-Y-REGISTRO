import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <div className="screen-shell">
      <div className="content-card">
        <h1>Bienvenido al sitio de compras</h1>
        <p className="subtitle">El rol cliente ve esta página principal.</p>
        <div className="info-block">
          <strong>Usuario:</strong> {auth?.name}
          <br />
          <strong>Correo:</strong> {auth?.email}
        </div>
        <button
          className="secondary-button"
          onClick={() => {
            clearAuth();
            navigate("/login", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
