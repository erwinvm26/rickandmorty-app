import { MigrationInterface, QueryRunner } from "typeorm";

export class schema1678201641529 implements MigrationInterface {
    name = 'schema1678201641529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fav" ("id" SERIAL NOT NULL, "idCharacter" integer NOT NULL, "fav" boolean NOT NULL DEFAULT false, "details" character varying, "page" integer NOT NULL DEFAULT '0', "accessId" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "userId" integer, CONSTRAINT "PK_5b599fa3e2db35e989237949af5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL DEFAULT '', "email" character varying(120) NOT NULL DEFAULT '', "password" character varying(255) NOT NULL DEFAULT '', "state" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(), "delete_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fav" ADD CONSTRAINT "FK_28f72c176231c33ef653782f38c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav" DROP CONSTRAINT "FK_28f72c176231c33ef653782f38c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "fav"`);
    }

}
