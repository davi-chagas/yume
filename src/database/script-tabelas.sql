CREATE DATABASE yume;
USE yume;

CREATE TABLE user (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(45) NOT NULL,
	username VARCHAR(15) NOT NULL UNIQUE,
	email VARCHAR(70) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
    img_url VARCHAR(255) NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(45) NOT NULL,
	description VARCHAR(150) NULL,
	img_url VARCHAR(255) NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE like_post (
	id INT AUTO_INCREMENT,
	user_id INT,
    post_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE comment_post (
	id INT AUTO_INCREMENT,
	user_id INT,
    post_id INT,
    content VARCHAR(150),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE obsession (
	user_id INT,
    PRIMARY KEY(user_id),
	FOREIGN KEY (user_id) REFERENCES user(id),
    favorite_anime VARCHAR(45) NULL,
    img_favorite_anime VARCHAR(255) NULL,
    watching_now VARCHAR(45) NULL,
    img_watching_now VARCHAR(255) NULL,
    favorite_character VARCHAR(45) NULL,
    img_favorite_character VARCHAR(255) NULL
);


