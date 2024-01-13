```markdown
# Aplicación de Quiz - React, Express y TypeScript

## Screenshots

![Screenshot 1](./img/imgen-1.png)
![Screenshot 2](./img/imgen-2.png)
![Screenshot 3](./img/imgen-3.png)
![Screenshot 4](./img/imgen-4.png)

## 1. Inicio Rápido
Clona el repositorio:

```bash
git clone https://github.com/Ruben890/Quiz-en-react-express-y-typescript.git
```

## 2. Instalar Dependencias
Asegúrate de tener todas las dependencias instaladas ejecutando:

```bash
npm install
```

## 3. Configurar Variables de Entorno del Proyecto
Copia el archivo de ejemplo `.env` y ajústalo con los detalles de conexión de tu base de datos:

```bash
cp .env.example .env
```

## 4. Ejecutar Migraciones
Aplica las migraciones de Prisma para crear el esquema de la base de datos. Asegúrate de estar en el directorio donde se encuentra la carpeta "prisma":

```bash
cd backend/src/prisma
npx prisma migrate dev --name init
```

## 5. Configurar Prisma
Asegúrate de tener [Prisma CLI](https://www.prisma.io/docs/getting-started/installation) instalado globalmente:

```bash
npm install -g prisma
```

## 6. Ejecutar Proyecto
Asegúrate de estar en el directorio de cada proyecto, tanto frontend como backend, y ejecuta:

```bash
npm run dev 
```

Este conjunto de pasos te permitirá tener la aplicación de Quiz en React, Express y TypeScript funcionando correctamente. ¡Disfruta explorando el proyecto!
```

