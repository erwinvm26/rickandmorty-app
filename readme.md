### Tenemos dos carpetas
  1. Backend
  2. Frontend

### First
En la carpeta backend tenemos un docker de la base de datos
Para correr el docker nos ubicamos en la carpeta del backend y ejecutamos este comando
```
docker-compose up -d db_rickandmorty
```

### Second
Podemos inicializar el backend y ejecutamos lo siguiente
```
pnpm install
pnpm dev
```

``
Automaticamente se estaran creando la base de datos en modo de desarrollo
``

Podemos inicializar el frontend y ejecutamos lo siguiente
```
pnpm install
pnpm dev
```

Nota: Tambien podemos usar ``yarn`` en lugar de ``pnpm`` si asi lo desea