import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1676580753702 implements MigrationInterface {
  name = 'Schema1676580753702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "email" character varying(120) NOT NULL DEFAULT '', "password" character varying(255) NOT NULL DEFAULT '', "state" boolean NOT NULL DEFAULT true, "date_created" TIMESTAMP NOT NULL, "date_update" TIMESTAMP NOT NULL, "date_delete" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
