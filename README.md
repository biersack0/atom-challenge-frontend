# ATOM CHALLENGE - APLICACIÓN DE TAREAS

Esta es una aplicación web desarrollada con Angular 17.3.6 para la gestión de tareas

## 📷 Capturas de Pantalla

![Aplicación](https://res.cloudinary.com/dpzospnqt/image/upload/v1756417589/Captura_de_pantalla_2025-08-28_a_la_s_16.42.13_lxzdd3.png)


![Aplicación](https://res.cloudinary.com/dpzospnqt/image/upload/v1756417590/Captura_de_pantalla_2025-08-28_a_la_s_16.43.06_tdggln.png)


![Aplicación](https://res.cloudinary.com/dpzospnqt/image/upload/v1756417591/Captura_de_pantalla_2025-08-28_a_la_s_16.43.51_c4imlh.png)


![Aplicación](https://res.cloudinary.com/dpzospnqt/image/upload/v1756417589/Captura_de_pantalla_2025-08-28_a_la_s_16.42.13_lxzdd3.png)



## 🚀 Características

- ✅ **Gestión completa de tareas**: Crear, editar, eliminar y marcar como completadas
- 🔍 **Filtrado**
- 🔐 **Autenticación de usuarios**
- 📱 **Diseño responsivo**
- 📱 **CI-CD**: Despliegue en firebase hosting automatizado con github actions

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular 17.3.6
- **Styling**: Bootstrap 5, SCSS
- **Modales**: ngx-bootstrap

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/atom-challenge-frontend.git
cd atom-challenge-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación en modo desarrollo:
```bash
ng serve
```

4. Abre tu navegador y ve a `http://localhost:4200`


## 🔐 Autenticación

La aplicación utiliza un sistema de autenticación basado en JWT:

- **Login**: Los usuarios pueden iniciar sesión con sus credenciales
- **Guardias**: Protección de rutas para usuarios autenticados
- **Interceptores**: Manejo automático de tokens en las peticiones HTTP
- **Almacenamiento seguro**: Tokens almacenados de forma segura

## 🧪 Testing

La aplicación incluye pruebas unitarias configuradas:

```bash
# Ejecutar todas las pruebas
ng test

# Ejecutar pruebas en modo watch
ng test --watch

# Generar reporte de cobertura
ng test --code-coverage
```

## 📦 Build y Despliegue

### Build de Producción

```bash
ng build --configuration production
```

### Despliegue en Firebase

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login en Firebase
firebase login

# Inicializar proyecto (si es la primera vez)
firebase init

# Desplegar
firebase deploy
```
