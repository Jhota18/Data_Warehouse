# Data_Warehouse

Herramienta que permite a una compañia de marketing administrar todos los contactos de sus clientes para sus campañas.

### Pre-requisitos

1. Instale y configure el motor de base de datos [MYSQL](https://www.mysql.com/downloads/).
2. Instale y configure [NodeJS](https://nodejs.org/es/).
3. Debe contar con un editor de codigo, de preferencia [VScode](https://code.visualstudio.com/).

### Instalación

Estos son los pasos que deberás seguir para tener un entorno de desarrollo ejecutable:

1. Ejecute el comando npm install dentro de la carpeta Back, en su consola de NodeJS para instalar todos los paquetes necesarios para ejecutar el proyecto (dotenv, express, helmet, jsonwebtoken, mysql2, nodemon, bcryptjs, cors, sequelize).

```

npm install

```

2. Para iniciar el proyecto en el front debe haber por lo menos un usuario Administrador registrado en la base de datos, por lo tanto primero debe ejecutar el archivo DB.sql en su base de datos MYSQL, este archivo creará las tablas e ingresará la informacion del usuario administrador con el cual posterior a correr el proyecto, deberá loguearse para poder empezar a realizar las pruebas.

3. Cree un archivo .env para guardar las siguientes variables de entorno:
   U=**INGRESE AQUI SU USUARIO DE BASES DE DATOS**
   P=**INGRESE LA CONTRASEÑA DE SU USUARIO DE BASE DE DATOS**
   S=**INGRESE UNA CLAVE SECRETA PARA LA VALIDACION DE LOS JSON WEB TOKENS**

4.Inice el proyecto dentro de la carpeta Back, en la terminal de su editor de codigo ejecutando el comando node server.js para inicar la base de datos y poder empezar a realizar las pruebas.

```

node server.js

```

## Ejecutando las pruebas

Para realizar las pruebas debe abrir en su navegador el archivo login.html e ingresar con el email y contraseña que se guardó en la base de datos al ejecutar el archivo databaseInfo.sql, este es:

```

email: admin@correo.com
contraseña: 123456

```

Despues de ingresar ya está todo listo para que empiece a realizar las pruebas en el Front.

## Autores

\* **Jhonatan Gomez** - [Data Warehouse](https://github.com/Jhota18/Data_Warehouse)
