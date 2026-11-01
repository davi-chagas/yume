var database = require("../database/config");

function getPosts() {
    var instrucaoSql = `SELECT * FROM post WHERE type = 'Post'`
    return database.executar(instrucaoSql);
}

function getQuizes() {
    var instrucaoSql = `SELECT * FROM post WHERE type = 'Quiz'`
    return database.executar(instrucaoSql);
}

function createPost(title, description, img_url, type, user_id) {
    var instrucaoSql = `INSERT INTO post (title, description, img_url, type, user_id) VALUES ('${title}', '${description}', '${img_url}', '${type}', ${user_id})`
    return database.executar(instrucaoSql);
}


module.exports = { getPosts, getQuizes, createPost };
