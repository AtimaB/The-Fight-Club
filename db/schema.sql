DROP DATABASE IF EXISTS fightclub;

CREATE DATABASE fightclub;

USE fightclub;

CREATE TABLE player1 (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE player2 (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);