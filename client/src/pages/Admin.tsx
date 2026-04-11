import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../utils/auth";

export default function Admin() {
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <div className="screen-shell">
      <div className="content-card">
        <h1>Panel administrativo</h1>
        <p className="subtitle">El rol administrador accede a este panel.</p>
        <div className="info-block">
          <strong>Administrador:</strong> {auth?.name}
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
