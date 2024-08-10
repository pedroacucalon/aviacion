## Requisitos del Proyecto

Para ejecutar este proyecto, necesitas instalar las siguientes dependencias:

1. **Node.js y npm**: Asegúrate de tener instalados Node.js y npm en tu sistema.

2. **Express**: Framework web para Node.js.

3. **Nodemon**: Herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación cuando se detectan cambios en los archivos.

4. **Prisma**: ORM (Object-Relational Mapping) para Node.js y TypeScript.

### Pasos de Instalación

1. **Instalar todas las dependencias**:

   Abre una terminal en la carpeta del proyecto y ejecuta:

   ```bash
   npm install

2. **Configurar el .env con las credenciales de su base de datos**

   Una vez configurado el .env, ejecutar el siguiente comando para hacer el migrate a la base de datos
   
   ```bash
   npx prisma migrate dev --schema=./src/models/schema.prisma --name=aviacion:v1.0

3. **Iniciar el proyecto en modo desarrollo**   

   ```bash
   npm run dev
