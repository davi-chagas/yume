CREATE DATABASE yume;
USE yume;

CREATE TABLE user (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(45) NOT NULL,
	username VARCHAR(15) NOT NULL UNIQUE,
	email VARCHAR(70) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
    img_url VARCHAR(300) NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(45) NOT NULL,
	description VARCHAR(150) NULL,
	img_url VARCHAR(300) NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	type VARCHAR(50) NOT NULL,
	CONSTRAINT ch_type CHECK (type IN('Post', 'Quiz')),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE quiz_question (
	id INT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(50) NOT NULL,
	alt_a VARCHAR(45) NOT NULL,
	alt_b VARCHAR(45) NOT NULL,
	alt_c VARCHAR(45) NOT NULL,
	alt_d VARCHAR(45) NOT NULL,
	correct_answer VARCHAR(45) NOT NULL,
	post_id INT,
	FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE like_post (
	user_id INT,
    post_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE comment_post (
	user_id INT,
    post_id INT,
    content VARCHAR(150),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);
