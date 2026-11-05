var database = require('../database/config')

function getAll(user_id) {
    var instrucaoSql = `SELECT * FROM obsession WHERE user_id = ${user_id}`
    return database.executar(instrucaoSql);
}

function updateObsession(
    favorite_anime,
    img_favorite_anime,
    watching_now,
    img_watching_now,
    favorite_character,
    img_favorite_character,
    user_id
) {
    var instrucaoSql = `
        UPDATE obsession SET
            favorite_anime = '${favorite_anime}',
            img_favorite_anime = COALESCE(
                ${img_favorite_anime ? `'${img_favorite_anime}'` : 'NULL'},
                img_favorite_anime
            ),
            watching_now = '${watching_now}',
            img_watching_now = COALESCE(
                ${img_watching_now ? `'${img_watching_now}'` : 'NULL'},
                img_watching_now
            ),
            favorite_character = '${favorite_character}',
            img_favorite_character = COALESCE(
                ${img_favorite_character ? `'${img_favorite_character}'` : 'NULL'},
                img_favorite_character
            )
        WHERE user_id = ${user_id}
    `;

    return database.executar(instrucaoSql);
}

module.exports = { getAll, updateObsession }