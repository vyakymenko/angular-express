CREATE TABLE "angular-express".public.scientist (
   id serial primary key,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL
);

INSERT INTO "angular-express".public.scientist
	(first_name, last_name)
VALUES
	('Edsger', 'Dijkstra'),
	('Donald', 'Knuth'),
	('Alan', 'Turing'),
	('Grace', 'Hopper');
