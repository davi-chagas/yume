var database = require("../database/config");

function getAll() {
    var instrucaoSql = `SELECT
    p.id AS post_id,
    p.title,
    p.description,
    p.img_url,
    p.created_at,
    p.user_id,
    u.name,
    u.username
FROM post AS p
JOIN user AS u
    ON u.id = p.user_id
ORDER BY p.created_at DESC;`
    return database.executar(instrucaoSql);
}

function createPost(title, description, user_id, img_url) {
    var instrucaoSql = `INSERT INTO post 
        (title, description, type, user_id, img_url) 
        VALUES ('${title}', '${description}', ${user_id}, '${img_url}')`;

    return database.executar(instrucaoSql);
}

function update(new_title, new_description, new_img_url, post_id) {
    var instrucaoSql = `UPDATE post SET title = '${new_title}', description = '${new_description}', img_url = '${new_img_url}' WHERE id = ${post_id}`;

    return database.executar(instrucaoSql);
}

function deletePost(post_id) {
    var instrucaoSql = `DELETE FROM post WHERE id = ${post_id};`;

    return database.executar(instrucaoSql);
}

module.exports = { getAll,createPost, update, deletePost };
