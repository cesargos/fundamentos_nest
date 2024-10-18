/*
docker run --name fundamentos_nestjs_sql \
-e MYSQL_DATABASE=fundamentos_nestjs \
-e MYSQL_ROOT_PASSWORD=1234 \
-p 3306:3306 -d mysql:5.7.30
*/

CREATE TABLE "fundamentos_nestjs"."users" (
	"user_id" INT UNSIGNED NOT NULL AUTO_INCREMENT,
	"name" VARCHAR(63) NOT NULL,
	"email" VARCHAR(127) NOT NULL,
	"password" VARCHAR(127) NOT NULL,
	"update_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	"create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY ("user_id")
);