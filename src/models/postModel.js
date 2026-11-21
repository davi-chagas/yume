var database = require("../database/config");

function listarPostagens(usuario_id) {
    var instrucaoSql = `
        SELECT
            p.id AS post_id,
            p.titulo AS title,
            p.descricao AS description,
            p.url_imagem AS img_url,
            DATE_FORMAT(p.criado_em, '%d/%m/%Y %H:%i:%s') AS criado_em,
            p.usuario_id AS user_id,
            u.nome,
            u.username,
            u.url_imagem AS user_img_url,
                (SELECT COUNT(*) FROM curtida_post cp1 WHERE cp1.postagem_id = p.id) AS COUNT_LIKE,
            (SELECT COUNT(*) FROM comentario_post cp2 WHERE cp2.postagem_id = p.id) AS COUNT_COMMENT,
            (SELECT COUNT(*) FROM curtida_post lp_user
                WHERE lp_user.postagem_id = p.id
                AND lp_user.usuario_id = ${usuario_id}) AS has_like
        FROM postagem AS p
        JOIN usuario AS u ON u.id = p.usuario_id
        ORDER BY p.criado_em DESC;`;

    return database.executar(instrucaoSql);
}

function listarComentarios() {
    var instrucaoSql = `
    SELECT 
    cp.postagem_id,
    u.id,
    u.username,
    cp.conteudo
    FROM postagem AS p
    JOIN comentario_post AS cp
    ON cp.postagem_id = p.id
    JOIN usuario AS u
    ON  u.id = cp.usuario_id
    ORDER BY cp.criado_em DESC;`

    return database.executar(instrucaoSql);
}


function criarPost(titulo, descricao, usuario_id, url_imagem) {
    var instrucaoSql = `INSERT INTO postagem 
        (titulo, descricao, usuario_id, url_imagem) 
        VALUES ('${titulo}', '${descricao}', ${usuario_id}, '${url_imagem}')`;

    return database.executar(instrucaoSql);
}

function comentarPost(usuario_id, postagem_id, conteudo) {
    var instrucaoSql =
        `INSERT INTO comentario_post (usuario_id, postagem_id, conteudo) VALUES
    (${usuario_id}, ${postagem_id}, '${conteudo}')`

    return database.executar(instrucaoSql);
}

function deletarComentario(postagem_id, usuario_id) {
    var instrucaoSql =
        `DELETE FROM comentario_post 
    WHERE postagem_id = ${postagem_id} AND usuario_id = ${usuario_id}`

    return database.executar(instrucaoSql);
}

function curtirPost(usuario_id, postagem_id) {
    var instrucaoSql =
        `INSERT INTO curtida_post (usuario_id, postagem_id) VALUES
     (${usuario_id}, ${postagem_id})`

    return database.executar(instrucaoSql);
}

function deletarCurtida(postagem_id, usuario_id) {
    var instrucaoSql =
        `DELETE FROM curtida_post 
    WHERE postagem_id = ${postagem_id} AND usuario_id = ${usuario_id}`

    return database.executar(instrucaoSql);
}

function atualizarPost(novo_titulo, nova_descricao, nova_url_imagem, postagem_id) {
    var instrucaoSql = `UPDATE postagem SET titulo = '${novo_titulo}', descricao = '${nova_descricao}', url_imagem = '${nova_url_imagem}' WHERE id = ${postagem_id}`;

    return database.executar(instrucaoSql);
}


module.exports = {
    listarPostagens,
    listarComentarios,
    criarPost,
    atualizarPost,
    comentarPost,
    curtirPost,
    deletarComentario,
    deletarCurtida
};
