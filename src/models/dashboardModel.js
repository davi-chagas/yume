var database = require('../database/config')

function getEngagement(user_id) {
    var instrucaoSql = `
    SELECT
(SELECT COUNT(*) FROM like_post) +
(SELECT COUNT(*) FROM comment_post) AS total
FROM post AS p
LEFT JOIN like_post lp
	ON lp.post_id = p.id
LEFT JOIN comment_post AS cp
ON cp.post_id = p.id
WHERE p.user_id = ${user_id}
GROUP BY p.user_id;`

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
    var instrucaoSql =
        `SELECT
title,
COUNT(lp.post_id) AS QTD_LIKE,
COUNT(cp.post_id) AS QTD_COMMENTS
FROM post p
LEFT JOIN like_post AS lp
ON lp.post_id = p.id
LEFT JOIN comment_post AS cp
ON cp.post_id = p.id
WHERE p.user_id = ${user_id}
GROUP BY p.id
LIMIT 1;`

    return database.executar(instrucaoSql);
}

function likePerMonth(user_id) {
    var instrucaoSql =
        `SELECT month(lp.created_at) AS month,
COUNT(lp.post_id) AS QTD_LIKE
FROM post p
 JOIN like_post AS lp
ON lp.post_id = p.id
WHERE p.user_id = ${user_id}
GROUP BY month (lp.created_at);`

    return database.executar(instrucaoSql);
}

function commentsPerMonth(user_id) {
    var instrucaoSql =
        `SELECT month(cp.created_at) AS month,
COUNT(cp.post_id) AS QTD_LIKE
FROM post p
 JOIN comment_post AS cp
ON cp.post_id = p.id
WHERE p.user_id = ${user_id}
GROUP BY month (cp.created_at);`

    return database.executar(instrucaoSql);
}

function allPostsByUser(user_id) {
    var instrucaoSql =
        `SELECT
title,
COUNT(lp.post_id) AS QTD_LIKE,
COUNT(cp.post_id) AS QTD_COMMENTS,
DATE_FORMAT(p.created_at, '%d-%m-%Y %h:%i:%s') AS created_at
FROM post p
LEFT JOIN like_post AS lp
ON lp.post_id = p.id
LEFT JOIN comment_post AS cp
ON cp.post_id = p.id
WHERE p.user_id = ${user_id}
GROUP BY p.id
LIMIT 100`

return database.executar(instrucaoSql);
}


module.exports = { getEngagement, getCountPost, biggerEngagement, likePerMonth, commentsPerMonth, allPostsByUser }