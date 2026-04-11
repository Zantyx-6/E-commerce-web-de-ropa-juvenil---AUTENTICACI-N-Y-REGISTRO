# 🛒 E-commerce Vibe Pulse - Sprint 1 (Grupo 1)

**Proyecto:** E-commerce web de ropa juvenil.  
**Objetivo Académico:** Desarrollar módulos independientes para realizar pruebas funcionales, visuales e integradas.  
**Duración del Sprint:** 1 semana.  
**Equipo:** Grupo 1 (6 integrantes).

Este repositorio contiene la arquitectura inicial y el **Sprint 1**, enfocándose única y exclusivamente en la **Autenticación y Registro de Usuarios**.

---

## 🎯 Objetivo del Sprint 1

Permitir que una persona pueda iniciar sesión o crear una cuenta. El sistema redirige automáticamente según las credenciales: cliente al sitio de compras y administrador al panel admin.

### Alcance
- Pantalla de Login.
- Pantalla de Registro.
- Validaciones completas de acceso (Front-end y Back-end).
- Redirección automática según el rol asignado a las credenciales.

---

## ✅ Criterios de Aceptación y Requerimientos

### 1. Funcionalidad de Frontend (React + Vite + TypeScript)

#### **Login**
- Se visualiza la pantalla de inicio de sesión con los campos **Correo** y **Contraseña**.
- Validaciones en tiempo real: formato válido para el correo y la contraseña no puede estar vacía.
- El botón **"Iniciar sesión"** permanecerá **deshabilitado** si hay campos vacíos.
- Mensaje de error claro si las credenciales son incorrectas.
- 🚫 **No** existe un selector manual de rol a la vista en la pantalla de login.
- Accesibilidad a la pantalla de "Registro" desde aquí.

#### **Registro**
- Campos solicitados: **Nombre completo**, **Correo**, **Contraseña** y **Confirmar contraseña**.
- Validaciones: 
  - Todos los campos son estrictamente obligatorios.
  - Las contraseñas digitadas deben coincidir.
  - Se debe cumplir con una longitud mínima de contraseña.
- Se debe aceptar la casilla obligatoria de **"Términos y Condiciones"** para continuar.
- El botón de **"Crear cuenta"** solo se habilita al cumplir la validación de todos los datos.
- Se muestra una **confirmación visual** tras un registro exitoso (antes de redirigir al login y/o página principal).
- Se puede retroceder del registro al login sin errores visuales.

#### **Interfaz / UX Común**
- Estados visuales en inputs: **foco** (focus), **error** y **éxito** (success).
- Prevención de **envíos duplicados** en formularios (al hacer clics rápidos/repetitivos).
- La vista es construida ***responsive***, funcionando en modo Desktop y adaptándose a pantallas menores.
- Mantener la coherencia visual con la aplicación estipulada para los demás grupos. Toda la interfaz será en español.

### 2. Lógica de Negocio / Backend (Node.js + Express + TypeScript)

- Creación y verificación de usuarios con contraseñas encriptadas en la Base de Datos PostgreSQL.
- **Redirección Basada en Roles:**
  - Si un usuario tiene el Rol `CLIENT` (cliente común), este será redirigido a la **página principal**.
  - Si un usuario tiene el Rol `ADMIN` (administrador), el sistema lo redirigirá al **panel administrativo**.

### 3. Modelo de Datos Prisma (Obligatorio)

La tabla de base de datos debe ser implementada manteniendo los campos y enumeraciones exactos según lo solicitado:

```prisma
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  password  String
  role      Role
}

enum Role {
  CLIENT
  ADMIN
}
```

---

## ⚠️ Reglas de Oro para la Integración

Para evitar generar conflictos con los grupos próximos (Sprints 2 al 5), los siguientes acuerdos son inquebrantables:
- Estructura unificada usando **TypeScript**.
- Uso exclusivo de las herramientas base indicadas (React, Vite, Express, PostgreSQL, Prisma). **No** sustituir librerías base.
- Se deben respetar los nombres de **rutas**, **componentes base** y la misma estandarización de jerarquía de carpetas.
- Mismos estilos: respetar misma **paleta de colores**, **tipografías** y **botones principales**.
- En caso de ser necesarios, acordar el uso de **datos simulados (mock data)** que todo equipo comparta.

---

## ⚙️ Pasos para ejecutar el Entorno

### Entorno del Backend
1. Entrar al directorio del servidor:
   ```bash
   cd server
   npm install
   ```
2. Crear tu archivo de variables locales `.env` y agregar la cadena de conexión de Prisma:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/vibepulse?schema=public"
   ```
3. Migrar la base de datos y arrancar:
   ```bash
   npx prisma db push
   npm run dev
   ```

### Entorno del Frontend
1. En otra consola o terminal ingresar a cliente e instalar:
   ```bash
   cd client
   npm install
   ```
2. Iniciar el servidor local de Vite:
   ```bash
   npm run dev
   ```
