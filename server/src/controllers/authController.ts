import { Request, Response } from "express";
import { createUser, findUserByEmail, validatePassword } from "../services/userService";
import { Role } from "@prisma/client";

const PASSWORD_MIN_LENGTH = 6;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase().trim() || "admin@vibepulse.com";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function register(req: Request, res: Response): Promise<Response> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "El correo no tiene un formato válido." });
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({ error: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.` });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: "Ya existe una cuenta con ese correo." });
  }

  const role = email.toLowerCase().trim() === ADMIN_EMAIL ? Role.ADMIN : Role.CLIENT;
  const user = await createUser(name.trim(), email.toLowerCase().trim(), password, role);
  return res.status(201).json({
    message: "Registro exitoso. Ahora puedes iniciar sesión.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

export async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "El correo y la contraseña son obligatorios." });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "El correo no tiene un formato válido." });
  }

  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos." });
  }

  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos." });
  }

  return res.status(200).json({
    message: "Inicio de sesión exitoso.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
