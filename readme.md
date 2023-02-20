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

### In addition, a point to highlight, in the api you can create the user, the only thing we don't have is the frontend, the endpoint will be: ``localhost:4000/api/login``