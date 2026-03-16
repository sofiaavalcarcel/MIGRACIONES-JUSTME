import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserRoles1773689673633 implements MigrationInterface {
    name = 'FixUserRoles1773689673633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "name" TO "nombre"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "idroles" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_aad804f6e9a585b1fd3fcbfcfe4" PRIMARY KEY ("idroles")`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_33192282b15cffef20b13ac5faa" UNIQUE ("nombre")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "miTest2" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role"("idroles") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "miTest2" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_33192282b15cffef20b13ac5faa"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_aad804f6e9a585b1fd3fcbfcfe4"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "idroles"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
    }

}
