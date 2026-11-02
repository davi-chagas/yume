var database = require("../database/config");

function getPosts() {
    var instrucaoSql = `SELECT * FROM post WHERE type = 'Post' ORDER BY created_at DESC`
    return database.executar(instrucaoSql);
}

function getQuizes() {
    var instrucaoSql = `SELECT * FROM post WHERE type = 'Quiz ORDER BY created_at DESC'`
    return database.executar(instrucaoSql);
}

function createPost(title, description, img_url, type, user_id) {
    var instrucaoSql = `INSERT INTO post (title, description, img_url, type, user_id) VALUES ('${title}', '${description}', '${img_url}', '${type}', ${user_id})`
    return database.executar(instrucaoSql);
}

function update(new_title, new_description, new_img_url, post_id){
    var instrucaoSql = `UPDATE post SET title = '${new_title}', description = '${new_description}', img_url = '${new_img_url}' WHERE id = ${post_id}`;

    return database.executar(instrucaoSql);
}

function deletePost(post_id){
    var instrucaoSql = `DELETE FROM post WHERE id = ${post_id};`;

    return database.executar(instrucaoSql);
}

module.exports = { getPosts, getQuizes, createPost, update, deletePost };
