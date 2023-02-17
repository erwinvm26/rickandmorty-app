import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'postgres',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/src/subscriber/*{.ts,.js}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
