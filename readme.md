### We have two folders.
  1. Backend
  2. Frontend

### First
In the backend folder we have a database docker To run the docker we locate ourselves in the backend folder and execute this command
```
docker-compose up -d db_rickandmorty
```

### Second
We can initialize the backend and execute the following
```
pnpm install
pnpm dev
```

``
The database will be automatically created in development mode
``

We can initialize the frontend and execute the following
```
pnpm install
pnpm dev
```

Note: You can also use ``yarn`` instead of ``pnpm`` if you wish.

----------------------------------------------------------------
``We still do not have the registration section, I would have to create it from the database``

### In addition, a point to highlight, in the api you can create the user, the only thing we don't have is the frontend, the endpoint will be: 
``http://localhost:4000/api/register``


### Last step

If we still have problems with the database, we can make a migration. In the package.json we have the following commands.

1. We position ourselves in the Backend.
2. The migration commands for the database are:
    ```
    1. pnpm migration:generate -> Funciona para generar la migracion de la base de datos partiendo de las entidades
    2. pnpm migration:show -> Podemos mostrar la miracion generada
    3. pnpm migration:run -> Nos permite migrar a la base de datos
    4. pnpm migration:revert -> revertimos la migracion
    ```

