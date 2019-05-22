CREATE TABLE `angular-express`.scientist (
   id INT primary key AUTO_INCREMENT NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `angular-express`.scientist
	(first_name, last_name)
VALUES
	('Edsger', 'Dijkstra'),
	('Donald', 'Knuth'),
	('Alan', 'Turing'),
	('Grace', 'Hopper');
