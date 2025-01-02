import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialUsers1735838271391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // password = @Password123
    await queryRunner.query(`
            INSERT INTO fundamentos_nestjs.users 
                (name, email, password, role) 
            VALUES
                ('John Doe', 'johndoe@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Jane Smith', 'janesmith@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Cesar Goulart', 'cesargoshulk@gmail.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 2),
                ('Alice Johnson', 'alicej@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Bob Brown', 'bobbrown@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Charlie Green', 'charlieg@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Eve White', 'evewhite@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Frank Black', 'frankb@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Grace Gray', 'gracegray@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Hank Blue', 'hankblue@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1),
                ('Ivy Yellow', 'ivyyellow@example.com', '$2b$10$7DSqmE8blCdZGEJAyfbxOecRYkAZfGAOE0UOR0CBV1C4j0OY4hHCW', 1);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM fundamentos_nestjs.users 
            WHERE email IN (
                'johndoe@example.com',
                'janesmith@example.com',
                'cesargoshulk@gmail.com',
                'alicej@example.com',
                'bobbrown@example.com',
                'charlieg@example.com',
                'evewhite@example.com',
                'frankb@example.com',
                'gracegray@example.com',
                'hankblue@example.com',
                'ivyyellow@example.com'
            );
        `);
  }
}
