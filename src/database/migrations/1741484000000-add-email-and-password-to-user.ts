import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailAndPasswordToUser1741484000000 implements MigrationInterface {
  name = 'AddEmailAndPasswordToUser1741484000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add columns as nullable first (no DEFAULT, no UNIQUE yet)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(255)`,
    );

    // 2. Give existing rows unique placeholder values based on their primary key
    await queryRunner.query(
      `UPDATE "user" SET "email" = 'migrated_user_' || id || '@placeholder.local' WHERE "email" IS NULL`,
    );
    await queryRunner.query(
      `UPDATE "user" SET "password" = '$2b$10$migrated.placeholder.hash.value.not.a.real.hash.xxxxx' WHERE "password" IS NULL`,
    );

    // 3. Now make columns NOT NULL
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );

    // 4. Add the UNIQUE constraint on email (now all values are distinct)
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_user_email"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}

