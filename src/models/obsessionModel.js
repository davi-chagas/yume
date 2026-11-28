var database = require('../database/config')

function listarObsessoes(usuario_id) {
    var instrucaoSql = `SELECT * FROM obsessao WHERE usuario_id = ${usuario_id}`
    return database.executar(instrucaoSql);
}

function atualizarObsessoes(
    favorite_anime, img_favorite_anime,
    watching_now, img_watching_now,
    favorite_character, img_favorite_character,
    usuario_id
) {
    var instrucaoSql = `
        INSERT INTO obsessao (
            usuario_id,
            anime_favorito, url_imagem_anime_favorito,
            assistindo_agora, url_imagem_assistindo_agora,
            personagem_favorito, url_imagem_personagem_favorito
        ) VALUES (
            ${usuario_id},
            '${favorite_anime}', ${img_favorite_anime ? `'${img_favorite_anime}'` : 'NULL'},
            '${watching_now}', ${img_watching_now ? `'${img_watching_now}'` : 'NULL'},
            '${favorite_character}', ${img_favorite_character ? `'${img_favorite_character}'` : 'NULL'}
        )
        ON DUPLICATE KEY UPDATE
            anime_favorito = VALUES(anime_favorito),
            url_imagem_anime_favorito = COALESCE(VALUES(url_imagem_anime_favorito), url_imagem_anime_favorito),
            assistindo_agora = VALUES(assistindo_agora),
            url_imagem_assistindo_agora = COALESCE(VALUES(url_imagem_assistindo_agora), url_imagem_assistindo_agora),
            personagem_favorito = VALUES(personagem_favorito),
            url_imagem_personagem_favorito = COALESCE(VALUES(url_imagem_personagem_favorito), url_imagem_personagem_favorito)
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { listarObsessoes, atualizarObsessoes }
