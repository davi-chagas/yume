var database = require('../database/config')

function getAll(user_id) {
    var instrucaoSql = `SELECT * FROM obsession WHERE user_id = ${user_id}`
    return database.executar(instrucaoSql);
}

function updateObsession(
    favorite_anime, img_favorite_anime,
    watching_now, img_watching_now,
    favorite_character, img_favorite_character,
    user_id
) {
    var instrucaoSql = `
        INSERT INTO obsession (
            user_id,
            favorite_anime, img_favorite_anime,
            watching_now, img_watching_now,
            favorite_character, img_favorite_character
        ) VALUES (
            ${user_id},
            '${favorite_anime}', ${img_favorite_anime ? `'${img_favorite_anime}'` : 'NULL'},
            '${watching_now}', ${img_watching_now ? `'${img_watching_now}'` : 'NULL'},
            '${favorite_character}', ${img_favorite_character ? `'${img_favorite_character}'` : 'NULL'}
        )
        ON DUPLICATE KEY UPDATE
            favorite_anime = VALUES(favorite_anime),
            img_favorite_anime = COALESCE(VALUES(img_favorite_anime), img_favorite_anime),
            watching_now = VALUES(watching_now),
            img_watching_now = COALESCE(VALUES(img_watching_now), img_watching_now),
            favorite_character = VALUES(favorite_character),
            img_favorite_character = COALESCE(VALUES(img_favorite_character), img_favorite_character)
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { getAll, updateObsession }