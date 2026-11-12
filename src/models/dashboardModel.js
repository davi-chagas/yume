var database = require('../database/config')

function engagement(user_id) {
    var instrucaoSql = `
    SELECT
        (SELECT COUNT(*) FROM like_post lp JOIN post p ON p.id = lp.post_id WHERE p.user_id = ${user_id})
        +
        (SELECT COUNT(*) FROM comment_post cp JOIN post p ON p.id = cp.post_id WHERE p.user_id = ${user_id})
        AS total;`

    return database.executar(instrucaoSql);
}

function getCountPost(user_id) {
    var instrucaoSql = `
    SELECT COUNT(*) AS count_post
     FROM post
    WHERE user_id = ${user_id}
    `

    return database.executar(instrucaoSql);
}

function biggerEngagement(user_id) {
    var instrucaoSql = `
    SELECT
        p.title,
        (SELECT COUNT(*) FROM like_post WHERE post_id = p.id) AS QTD_LIKE,
        (SELECT COUNT(*) FROM comment_post WHERE post_id = p.id) AS QTD_COMMENTS
    FROM post p
    WHERE p.user_id = ${user_id}
    ORDER BY (QTD_LIKE + QTD_COMMENTS) DESC
    LIMIT 1;`;

    return database.executar(instrucaoSql);
}

function likePerMonth(user_id) {
    var instrucaoSql =
        `SELECT month(lp.created_at) AS month,
COUNT(lp.post_id) AS QTD_LIKE
FROM post p
 JOIN like_post AS lp
ON lp.post_id = p.id
WHERE p.user_id = ${user_id} AND YEAR(lp.created_at) = YEAR(CURDATE())
GROUP BY month (lp.created_at);`

    return database.executar(instrucaoSql);
}

function commentsPerMonth(user_id) {
    var instrucaoSql =
        `SELECT month(cp.created_at) AS month,
         COUNT(cp.post_id) AS QTD_COMMENTS
FROM post p
 JOIN comment_post AS cp
ON cp.post_id = p.id
WHERE p.user_id = ${user_id} AND YEAR(cp.created_at) = YEAR(CURDATE())
GROUP BY month (cp.created_at);`

    return database.executar(instrucaoSql);
}

function allPostsByUser(user_id) {
    var instrucaoSql = `
        SELECT
            p.id AS post_id,
            p.title,
            (SELECT COUNT(*) FROM like_post WHERE post_id = p.id) AS QTD_LIKE,
            (SELECT COUNT(*) FROM comment_post WHERE post_id = p.id) AS QTD_COMMENTS,
            DATE_FORMAT(p.created_at, '%d-%m-%Y %H:%i:%s') AS created_at
        FROM post p
        WHERE p.user_id = ${user_id}
        ORDER BY p.created_at DESC
        LIMIT 100`;

    return database.executar(instrucaoSql);
}

function deletePost(post_id, user_id) {
    var donoDoPost = `SELECT id FROM post WHERE id = ${post_id} AND user_id = ${user_id}`;

    return database.executar(`DELETE FROM like_post WHERE post_id IN (${donoDoPost})`)
        .then(function () {
            return database.executar(`DELETE FROM comment_post WHERE post_id IN (${donoDoPost})`);
        })
        .then(function () {
            return database.executar(`DELETE FROM post WHERE id = ${post_id} AND user_id = ${user_id}`);
        });
}


module.exports = { engagement,deletePost, getCountPost, biggerEngagement, likePerMonth, commentsPerMonth, allPostsByUser }