import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesAndUserRolesTable1772142322227 implements MigrationInterface {
    name = 'AddRolesAndUserRolesTable1772142322227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla role
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);

        // Agregar columna miTest3 a user (no existía en migraciones anteriores)
        await queryRunner.query(`ALTER TABLE "user" ADD "miTest3" character varying(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "miTest3" DROP DEFAULT`);

        // Crear tabla pivot user_roles
        await queryRunner.query(`CREATE TABLE "user_roles" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `);

        // Foreign Keys
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "miTest3"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
