/*
docker run --name fundamentos_nestjs_sql \
-e MYSQL_DATABASE=fundamentos_nestjs \
-e MYSQL_ROOT_PASSWORD=1234 \
-p 3306:3306 -d mysql:5.7.30
*/

CREATE TABLE `fundamentos_nestjs`.`users` (
	`user_id` INT  NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(63) NOT NULL,
	`email` VARCHAR(127) NOT NULL,
	`password` VARCHAR(127) NOT NULL,
  `birth_date` DATE NULL,
	`role` INT NOT NULL DEFAULT 1,
	`update_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	`create_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY (`user_id`)
);

INSERT INTO fundamentos_nestjs.users (`name`, `email`, `password`, `role`, `update_at`, `create_at`) VALUES
('John Doe', 'johndoe@example.com', 'password123', 1, NOW(), NOW()),
('Jane Smith', 'janesmith@example.com', 'password123', 1, NOW(), NOW()),
('Cesar Goulart', 'cesargoshulk@gmail.com', '1234', 2, NOW(), NOW()),
('Alice Johnson', 'alicej@example.com', 'password123', 1, NOW(), NOW()),
('Bob Brown', 'bobbrown@example.com', 'password123', 1, NOW(), NOW()),
('Charlie Green', 'charlieg@example.com', 'password123', 1, NOW(), NOW()),
('Eve White', 'evewhite@example.com', 'password123', 1, NOW(), NOW()),
('Frank Black', 'frankb@example.com', 'password123', 1, NOW(), NOW()),
('Grace Gray', 'gracegray@example.com', 'password123', 1, NOW(), NOW()),
('Hank Blue', 'hankblue@example.com', 'password123', 1, NOW(), NOW()),
('Ivy Yellow', 'ivyyellow@example.com', 'password123', 1, NOW(), NOW());