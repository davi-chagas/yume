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

SELECT * FROM user;

INSERT INTO like_post (user_id, post_id) VALUES 
(1, 1);

DELETE FROM like_post
WHERE post_id = 1;

SELECT * FROM like_post;

SELECT
    p.id AS post_id,
    p.title,
    p.description,
    p.img_url,
    DATE_FORMAT(p.created_at, '%d/%m/%Y %h:%m:%s') AS created_at,
    p.user_id,
    u.name,
    u.username,
    COUNT(lp.post_id) AS count_like
FROM post AS p
JOIN user AS u
    ON u.id = p.user_id
LEFT JOIN like_post as lp
	ON lp.post_id = p.id
    GROUP BY p.id
ORDER BY p.created_at DESC;


