-- ALTER script to rename tables/columns from English to Portuguese (MySQL)
-- Execute carefully on a backup copy of the database.

-- Rename tables
RENAME TABLE `user` TO `usuario`;
RENAME TABLE `post` TO `postagem`;
RENAME TABLE `like_post` TO `curtida_post`;
RENAME TABLE `comment_post` TO `comentario_post`;

-- Rename columns in usuario
ALTER TABLE `usuario` CHANGE COLUMN `name` `nome` VARCHAR(45);
ALTER TABLE `usuario` CHANGE COLUMN `password` `senha` VARCHAR(50);
ALTER TABLE `usuario` CHANGE COLUMN `img_url` `url_imagem` VARCHAR(255);
ALTER TABLE `usuario` CHANGE COLUMN `created_at` `criado_em` DATETIME;

-- Rename columns in postagem
ALTER TABLE `postagem` CHANGE COLUMN `title` `titulo` VARCHAR(45);
ALTER TABLE `postagem` CHANGE COLUMN `description` `descricao` VARCHAR(150);
ALTER TABLE `postagem` CHANGE COLUMN `img_url` `url_imagem` VARCHAR(255);
ALTER TABLE `postagem` CHANGE COLUMN `created_at` `criado_em` DATETIME;
ALTER TABLE `postagem` CHANGE COLUMN `user_id` `usuario_id` INT;

-- Rename columns in curtida_post
ALTER TABLE `curtida_post` CHANGE COLUMN `user_id` `usuario_id` INT;
ALTER TABLE `curtida_post` CHANGE COLUMN `post_id` `postagem_id` INT;
ALTER TABLE `curtida_post` CHANGE COLUMN `created_at` `criado_em` DATETIME;

-- Rename columns in comentario_post
ALTER TABLE `comentario_post` CHANGE COLUMN `user_id` `usuario_id` INT;
ALTER TABLE `comentario_post` CHANGE COLUMN `post_id` `postagem_id` INT;
ALTER TABLE `comentario_post` CHANGE COLUMN `content` `conteudo` VARCHAR(150);
ALTER TABLE `comentario_post` CHANGE COLUMN `created_at` `criado_em` DATETIME;

-- Rename obsession table to obsessao and its columns
RENAME TABLE `obsession` TO `obsessao`;
ALTER TABLE `obsessao` CHANGE COLUMN `user_id` `usuario_id` INT;
ALTER TABLE `obsessao` CHANGE COLUMN `favorite_anime` `anime_favorito` VARCHAR(45);
ALTER TABLE `obsessao` CHANGE COLUMN `img_favorite_anime` `url_imagem_anime_favorito` VARCHAR(255);
ALTER TABLE `obsessao` CHANGE COLUMN `watching_now` `assistindo_agora` VARCHAR(45);
ALTER TABLE `obsessao` CHANGE COLUMN `img_watching_now` `url_imagem_assistindo_agora` VARCHAR(255);
ALTER TABLE `obsessao` CHANGE COLUMN `favorite_character` `personagem_favorito` VARCHAR(45);
ALTER TABLE `obsessao` CHANGE COLUMN `img_favorite_character` `url_imagem_personagem_favorito` VARCHAR(255);

-- Notes:
-- Verify and adjust foreign key constraint names before running drop/add FK commands.
