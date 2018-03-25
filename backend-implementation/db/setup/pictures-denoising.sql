DROP DATABASE IF EXISTS Pictures-Denoising;
CREATE DATABASE Pictures-denoising;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(30) NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password_digest text NOT NULL,
    age int(3) ALLOW NULL CHECK (age > 0)
)