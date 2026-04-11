📑 Documentación de Proyecto: Sprint 1 - Grupo 1

👕 Información General
- Proyecto: E-commerce web de ropa juvenil.
- Objetivo Académico: Desarrollar módulos independientes para realizar pruebas funcionales, visuales e integradas.
- Duración del Sprint: 1 semana.
- Equipo: Grupo 1 (6 integrantes).

🛠️ Stack Tecnológico Obligatorio
El sistema debe desarrollarse utilizando TypeScript como lenguaje principal en todo el proyecto.

Frontend
- Framework: React.
- Herramienta de construcción: Vite (elegido por su arranque rápido y hot reload).
- Optimización: Principalmente para entorno de escritorio.

Backend
- Entorno: Node.js.
- Framework: Express.
- Base de datos: PostgreSQL.
- ORM: Prisma.

📂 Estructura del Repositorio
Para garantizar la integración con los futuros grupos, se debe respetar la siguiente jerarquía de carpetas:

ecommerce-vibe-pulse/
├── client/                 # React + Vite + TS
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Pantallas (Login, Registro)
│   │   ├── services/       # Consumo de API (Auth)
│   │   ├── types/          # Definiciones de TS
│   │   └── routes/         # Definición de rutas
├── server/                 # Node + Express + TS
│   ├── src/
│   │   ├── controllers/    # Lógica de endpoints
│   │   ├── routes/         # Definición de rutas API
│   │   └── middleware/     # Validaciones y JWT
├── prisma/
│   └── schema.prisma       # Modelos de base de datos
└── README.md

🗄️ Modelo de Datos (Prisma)
El Grupo 1 es responsable de definir el modelo inicial de usuarios. Es obligatorio usar estos nombres de campos:

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

🎯 Objetivo del Sprint 1: Autenticación y Registro
Permitir que una persona inicie sesión o cree una cuenta, con redirección automática según su rol.

Criterios de Aceptación (Frontend)
- Pantalla de Login:
    - Campos: Correo y contraseña.
    - Validaciones: Formato de correo válido y contraseña no vacía.
    - Botón "Iniciar sesión" deshabilitado si hay campos vacíos.
    - No debe existir un selector manual de rol.

- Pantalla de Registro:
    - Campos: Nombre completo, correo, contraseña y confirmar contraseña.
    - Validaciones: Todos los campos obligatorios, coincidencia de contraseñas y longitud mínima.
    - Checkbox obligatorio de "Términos y Condiciones".

- Interfaz:
    - Estados visuales de foco, error y éxito en los campos.
    - Prevención de envíos duplicados al hacer clic varias veces.
    - Totalmente en español.

Lógica de Negocio (Backend/Redirección)
- Si las credenciales corresponden a un CLIENT, redirigir a la página principal.
- Si corresponden a un ADMIN, redirigir al panel administrativo.

⚠️ Reglas de Oro para la IntegraciónPara que el trabajo del Grupo 1 no rompa los módulos de los grupos 2 al 5, deben acordar desde el inicio:
- Misma paleta de colores y tipografía.
- Mismos nombres de rutas y componentes base.
- Estructura de navegación definida.
- Uso de datos simulados (mock data) comunes si es necesario.

Mockups de referencia: https://stitch.withgoogle.com/projects/4591858935545205753

Objetivo:

Permitir que una persona pueda iniciar sesión o crear una cuenta. El sistema redirige automáticamente según las credenciales: cliente al sitio de compras y administrador al panel admin.
Alcance
•	Login 
•	Registro 
•	Validaciones de acceso 
•	Redirección según credenciales 

Criterios de aceptación
1.	El usuario puede visualizar la pantalla de inicio de sesión. 
2.	La pantalla de login muestra los campos correo y contraseña. 
3.	El usuario puede escribir en ambos campos. 
4.	El sistema valida que el correo tenga formato válido. 
5.	El sistema valida que la contraseña no esté vacía. 
6.	El botón de iniciar sesión permanece deshabilitado si hay campos vacíos. 
7.	Si las credenciales son incorrectas, el sistema muestra mensaje de error claro. 
8.	Si las credenciales corresponden a un cliente, el sistema redirige a la página principal. 
9.	Si las credenciales corresponden a un administrador, el sistema redirige al panel administrativo. 
10.	El sistema no muestra selector manual de rol en el login. 
11.	El usuario puede acceder a la pantalla de registro desde el login. 
12.	La pantalla de registro muestra los campos nombre completo, correo, contraseña y confirmar contraseña. 
13.	El sistema valida que todos los campos del registro sean obligatorios. 
14.	El sistema valida que las contraseñas coincidan. 
15.	El sistema valida longitud mínima de contraseña. 
16.	El usuario debe aceptar términos y condiciones para continuar. 
17.	El botón crear cuenta solo se habilita cuando todos los datos son válidos. 
18.	Al registrarse correctamente, el sistema muestra confirmación visual. 
19.	Luego del registro exitoso, el usuario es redirigido a la página principal o al login, según la definición del proyecto. 
20.	El usuario puede volver del registro al login sin errores visuales. 
21.	Los campos muestran estados visuales de foco, error y éxito. 
22.	El formulario evita envíos duplicados al hacer clic varias veces. 
23.	La interfaz mantiene coherencia visual con el resto del sistema. 
24.	La vista funciona correctamente en desktop y se adapta a tamaños menores sin romperse. 

STACK TECNOLÓGICO 
Frontend
•	React 
•	Vite 
•	TypeScript 
 Backend
•	Node.js 
•	Express 
•	TypeScript 
Base de datos
•	PostgreSQL 
ORM
•	Prisma 

¿Por qué React + Vite?
Esto es importante que lo entiendas para justificarlo en clase:
Vite aporta:
•	Arranque súper rápido 
•	Hot reload inmediato 
•	Configuración simple 
•	Mejor experiencia para estudiantes 
React aporta:
•	Componentes reutilizables 
•	Separación clara por pantallas (perfecto para sprints) 
•	Fácil integración entre equipos 
TypeScript:
•	Tipado fuerte 
•	Menos errores 
•	Mejor integración entre módulos 

 ESTRUCTURA RECOMENDADA DEL PROYECTO
ecommerce-vibe-pulse/
│
├── client/                     # React + Vite + TS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── routes/
│
├── server/                     # Node + Express + TS
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── config/
│
├── prisma/
│   └── schema.prisma
│
└── README.md

REGLAS IMPORTANTES PARA LOS GRUPOS
Para que no se rompa todo (esto es CLAVE en tu proyecto):
Convenciones obligatorias
•	Todo el código en TypeScript 
•	Usar React + Vite 
•	No cambiar librerías base 
•	Respetar estructura de carpetas 
•	Usar mismos nombres de rutas 
•	Usar mismos nombres de componentes base 
•	Usar mismos modelos de datos 

MODELO CLAVE (PRISMA)
En tu schema.prisma deben existir mínimo:
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

CÓMO SE CONECTA CON LOS SPRINTS
•	Sprint 1 → maneja User + Auth 
•	Sprint 2 → usa Product 
•	Sprint 3 → usa Cart + CartItem 
•	Sprint 4 → usa Order 
•	Sprint 5 → usa todo (Admin) 

Tecnologías del proyecto
El sistema será desarrollado utilizando TypeScript como lenguaje principal tanto en frontend como en backend.
Para el frontend se utilizará React con Vite, permitiendo una aplicación web moderna, rápida y modular, optimizada principalmente para entorno de escritorio.
El backend será desarrollado con Node.js y Express, también en TypeScript, encargándose de la lógica del sistema y la comunicación con la base de datos.
La persistencia de datos se realizará con PostgreSQL, y el acceso a la base de datos será gestionado mediante Prisma ORM, facilitando un manejo estructurado y tipado de la información.

Funcionalidades generales del sistema
El sistema completo tendrá estas funcionalidades:
1.	Inicio de sesión 
2.	Registro de usuarios 
3.	Página principal 
4.	Catálogo de productos 
5.	Detalle de producto 
6.	Carrito de compras 
7.	Checkout o pago simulado 
8.	Panel de administración 

Recomendación técnica para que los sprints no se estorben
Para que los equipos trabajen separados, desde el inicio estas se seguirán estas reglas comunes:
•	misma paleta de colores 
•	misma tipografía 
•	mismos nombres de pantallas 
•	mismos nombres de botones principales 
•	mismos nombres de campos 
•	estructura de navegación acordada 
•	datos simulados o mock data comunes 
•	rutas o vistas base definidas desde el comienzo 
Así cada equipo construye su parte sin romper el resto.

