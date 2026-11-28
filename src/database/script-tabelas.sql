CREATE DATABASE yume;
USE yume;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    username VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(70) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    url_imagem VARCHAR(255) NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE postagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    descricao VARCHAR(150) NULL,
    url_imagem VARCHAR(255) NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE curtida_post (
    id INT AUTO_INCREMENT,
    usuario_id INT,
    postagem_id INT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, usuario_id, postagem_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (postagem_id) REFERENCES postagem(id)
);

CREATE TABLE comentario_post (
    id INT AUTO_INCREMENT,
    usuario_id INT,
    postagem_id INT,
    conteudo VARCHAR(150),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, usuario_id, postagem_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (postagem_id) REFERENCES postagem(id)
);

CREATE TABLE obsessao (
    usuario_id INT,
    PRIMARY KEY(usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    anime_favorito VARCHAR(45) NULL,
    url_imagem_anime_favorito VARCHAR(255) NULL,
    assistindo_agora VARCHAR(45) NULL,
    url_imagem_assistindo_agora VARCHAR(255) NULL,
    personagem_favorito VARCHAR(45) NULL,
    url_imagem_personagem_favorito VARCHAR(255) NULL
);
