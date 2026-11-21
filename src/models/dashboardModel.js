var database = require('../database/config')

function engajamento(usuario_id) {
    var instrucaoSql = `
    SELECT
        (SELECT COUNT(*) FROM curtida_post cp JOIN postagem p ON p.id = cp.postagem_id WHERE p.usuario_id = ${usuario_id})
        +
        (SELECT COUNT(*) FROM comentario_post cm JOIN postagem p ON p.id = cm.postagem_id WHERE p.usuario_id = ${usuario_id})
        AS total;`

    return database.executar(instrucaoSql);
}

function contarPostagens(usuario_id) {
    var instrucaoSql = `
    SELECT COUNT(*) AS qtd_postagens
     FROM postagem
    WHERE usuario_id = ${usuario_id}
    `

    return database.executar(instrucaoSql);
}

function postagemMaiorEngajamento(usuario_id) {
    var instrucaoSql = `
    SELECT
        p.titulo,
        (SELECT COUNT(*) FROM curtida_post WHERE postagem_id = p.id) AS QTD_LIKE,
        (SELECT COUNT(*) FROM comentario_post WHERE postagem_id = p.id) AS QTD_COMMENTS
    FROM postagem p
    WHERE p.usuario_id = ${usuario_id}
    ORDER BY (QTD_LIKE + QTD_COMMENTS) DESC
    LIMIT 1;`;

    return database.executar(instrucaoSql);
}

function curtidasPorMes(usuario_id) {
    var instrucaoSql =
        `SELECT month(cp.criado_em) AS mes,
COUNT(cp.postagem_id) AS QTD_LIKE
FROM postagem p
 JOIN curtida_post AS cp
ON cp.postagem_id = p.id
WHERE p.usuario_id = ${usuario_id} AND YEAR(cp.criado_em) = YEAR(CURDATE())
GROUP BY month (cp.criado_em);`

    return database.executar(instrucaoSql);
}

function comentariosPorMes(usuario_id) {
    var instrucaoSql =
        `SELECT month(cm.criado_em) AS mes,
         COUNT(cm.postagem_id) AS QTD_COMMENTS
FROM postagem p
 JOIN comentario_post AS cm
ON cm.postagem_id = p.id
WHERE p.usuario_id = ${usuario_id} AND YEAR(cm.criado_em) = YEAR(CURDATE())
GROUP BY month (cm.criado_em);`

    return database.executar(instrucaoSql);
}

function todasPostagensDoUsuario(usuario_id) {
    var instrucaoSql = `
        SELECT
            p.id AS post_id,
            p.titulo AS title,
            (SELECT COUNT(*) FROM curtida_post WHERE postagem_id = p.id) AS QTD_LIKE,
            (SELECT COUNT(*) FROM comentario_post WHERE postagem_id = p.id) AS QTD_COMMENTS,
            DATE_FORMAT(p.criado_em, '%d-%m-%Y %H:%i:%s') AS criado_em
        FROM postagem p
        WHERE p.usuario_id = ${usuario_id}
        ORDER BY p.criado_em DESC
        LIMIT 100`;

    return database.executar(instrucaoSql);
}

function excluirPost(postagem_id, usuario_id) {
    var donoDaPostagem = `SELECT id FROM postagem WHERE id = ${postagem_id} AND usuario_id = ${usuario_id}`;

    return database.executar(`DELETE FROM curtida_post WHERE postagem_id IN (${donoDaPostagem})`)
        .then(function () {
            return database.executar(`DELETE FROM comentario_post WHERE postagem_id IN (${donoDaPostagem})`);
        })
        .then(function () {
            return database.executar(`DELETE FROM postagem WHERE id = ${postagem_id} AND usuario_id = ${usuario_id}`);
        });
}


module.exports = { engajamento, excluirPost, contarPostagens, postagemMaiorEngajamento, curtidasPorMes, comentariosPorMes, todasPostagensDoUsuario }
