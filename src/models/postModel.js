var database = require("../database/config");

function getAll() {
    var instrucaoSql = `SELECT
    p.id AS post_id,
    p.title,
    p.description,
    p.img_url,
    DATE_FORMAT(p.created_at, '%d/%m/%Y %h:%i:%s') AS created_at,
    p.user_id,
    u.name,
    u.username,
    COUNT(lp.post_id) AS COUNT_LIKE,
    COUNT(cp.post_id) AS COUNT_COMMENT
FROM post AS p
JOIN user AS u
    ON u.id = p.user_id
LEFT JOIN like_post AS lp
    ON lp.post_id = p.id
LEFT JOIN comment_post AS cp
    ON cp.post_id = p.id
GROUP BY p.id
ORDER BY p.created_at DESC;`
    return database.executar(instrucaoSql);
}

function getComments() {
    var instrucaoSql = `
    SELECT 
    u.id,
    u.username,
    cp.content
    FROM post AS p
    JOIN comment_post AS cp
    ON cp.post_id = p.id
    JOIN user AS u
    ON  u.id = cp.user_id
    ORDER BY cp.created_at DESC;`

    return database.executar(instrucaoSql);
}


function createPost(title, description, user_id, img_url) {
    var instrucaoSql = `INSERT INTO post 
        (title, description, user_id, img_url) 
        VALUES ('${title}', '${description}', ${user_id}, '${img_url}')`;

    return database.executar(instrucaoSql);
}

function commentPost(user_id, post_id, content) {
    var instrucaoSql =
        `INSERT INTO comment_post (user_id, post_id, content_id) VALUES
    (${user_id}, ${post_id}, '${content}')`

    return database.executar(instrucaoSql);
}

function deleteCommentPost(post_id) {
    var instrucaoSql =
        `DELETE FROM comment_post
    WHERE post_id = ${post_id}`

    return database.executar(instrucaoSql);
}

function likePost(user_id, post_id) {
    var instrucaoSql =
        `INSERT INTO like_post (user_id, post_id) VALUES
     (${user_id}, ${post_id})`

    return database.executar(instrucaoSql);
}

function deleteLikePost(post_id) {
    var instrucaoSql =
        `DELETE FROM like_post 
    WHERE post_id = ${post_id}`
}

function update(new_title, new_description, new_img_url, post_id) {
    var instrucaoSql = `UPDATE post SET title = '${new_title}', description = '${new_description}', img_url = '${new_img_url}' WHERE id = ${post_id}`;

    return database.executar(instrucaoSql);
}

function deletePost(post_id) {
    var instrucaoSql = `DELETE FROM post WHERE id = ${post_id};`;

    return database.executar(instrucaoSql);
}

module.exports = {
    getAll, getComments, createPost, update, deletePost, commentPost, likePost, deleteCommentPost, deleteLikePost
};
