import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory(_config: ConfigService) {
      return {
        type: 'postgres',
        host: _config.get('HOST_DB'),
        database: _config.get('DATABASE_DB'),
        username: _config.get('USERNAME_DB'),
        password: _config.get('PASSWORD_DB'),
        entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
      };
    },
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();

      return dataSource;
    },
  }),
];
