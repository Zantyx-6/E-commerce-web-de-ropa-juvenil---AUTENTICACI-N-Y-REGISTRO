import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../services/api";
import { setAuth } from "../utils/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getLoginStatus(email: string, password: string) {
  return {
    emailError: email.trim().length === 0 ? "El correo es obligatorio." : !emailPattern.test(email) ? "Ingrese un correo válido." : "",
    passwordError: password.trim().length === 0 ? "La contraseña no puede estar vacía." : "",
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { emailError, passwordError } = useMemo(
    () => getLoginStatus(email, password),
    [email, password]
  );

  const isValid = !emailError && !passwordError;
  const buttonDisabled = !isValid || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await loginRequest({ email, password });
      setAuth(result.user);
      if (result.user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Error de inicio de sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen-shell">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="subtitle">Accede con tu correo y contraseña para continuar.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`input-field ${emailError ? "error" : email.length > 0 ? "success" : ""}`}
              placeholder="ejemplo@correo.com"
              autoComplete="username"
            />
            {emailError && <span className="field-error">{emailError}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`input-field ${passwordError ? "error" : password.length > 0 ? "success" : ""}`}
              placeholder="********"
              autoComplete="current-password"
            />
            {passwordError && <span className="field-error">{passwordError}</span>}
          </div>

          {serverError && <div className="alert error-alert">{serverError}</div>}

          <button type="submit" className="primary-button" disabled={buttonDisabled}>
            {isSubmitting ? "Validando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="form-footer">
          <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}
