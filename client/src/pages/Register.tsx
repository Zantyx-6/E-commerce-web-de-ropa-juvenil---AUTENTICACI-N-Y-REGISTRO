import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../services/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function getRegisterStatus(values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}) {
  const errors = {
    nameError: values.name.trim().length === 0 ? "El nombre completo es obligatorio." : "",
    emailError:
      values.email.trim().length === 0
        ? "El correo es obligatorio."
        : !emailPattern.test(values.email)
        ? "Ingrese un correo válido."
        : "",
    passwordError:
      values.password.trim().length === 0
        ? "La contraseña es obligatoria."
        : values.password.length < MIN_PASSWORD_LENGTH
        ? `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
        : "",
    confirmPasswordError:
      values.confirmPassword.trim().length === 0
        ? "Debes confirmar la contraseña."
        : values.confirmPassword !== values.password
        ? "Las contraseñas no coinciden."
        : "",
    termsError: values.acceptedTerms ? "" : "Debes aceptar términos y condiciones.",
  };
  return errors;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { nameError, emailError, passwordError, confirmPasswordError, termsError } = useMemo(
    () => getRegisterStatus({ name, email, password, confirmPassword, acceptedTerms }),
    [name, email, password, confirmPassword, acceptedTerms]
  );

  const isValid = !nameError && !emailError && !passwordError && !confirmPasswordError && !termsError;
  const buttonDisabled = !isValid || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;
    setServerError(null);
    setServerMessage(null);
    setIsSubmitting(true);

    try {
      const result = await registerRequest({ name, email, password });
      setServerMessage(result.message);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1400);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Error de registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen-shell">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="subtitle">Completa todos los campos para crear tu cuenta.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`input-field ${nameError ? "error" : name.length > 0 ? "success" : ""}`}
              placeholder="Tu nombre completo"
              autoComplete="name"
            />
            {nameError && <span className="field-error">{nameError}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`input-field ${emailError ? "error" : email.length > 0 ? "success" : ""}`}
              placeholder="ejemplo@correo.com"
              autoComplete="email"
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
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
            />
            {passwordError && <span className="field-error">{passwordError}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={`input-field ${confirmPasswordError ? "error" : confirmPassword.length > 0 ? "success" : ""}`}
              placeholder="Repite la contraseña"
              autoComplete="new-password"
            />
            {confirmPasswordError && <span className="field-error">{confirmPasswordError}</span>}
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              Acepto términos y condiciones
            </label>
            {termsError && <span className="field-error">{termsError}</span>}
          </div>

          {serverError && <div className="alert error-alert">{serverError}</div>}
          {serverMessage && <div className="alert success-alert">{serverMessage}</div>}

          <button type="submit" className="primary-button" disabled={buttonDisabled}>
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <div className="form-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Volver al inicio de sesión</Link></p>
        </div>
      </div>
    </div>
  );
}
