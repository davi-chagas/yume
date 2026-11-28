var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, username, url_imagem FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, username, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, username, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da namenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, username, email, senha) VALUES ('${nome}', '${username}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function update(nome, username, url_imagem, email, user_id) {
    var instrucaoSql = `
        UPDATE usuario
        SET nome = '${nome}',
            username = '${username}',
            url_imagem = ${url_imagem ? "'" + url_imagem + "'" : 'NULL'},
            email = '${email}'
        WHERE id = ${user_id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(user_id) {
    var instrucaoSql = `SELECT id, nome, username, email, url_imagem FROM usuario WHERE id = ${user_id};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    update,
    buscarPorId: buscarPorId
};

function buscarPorId(usuario_id) {
    var instrucaoSql = `SELECT id, nome, username, email, url_imagem FROM usuario WHERE id = ${usuario_id};`;
    return database.executar(instrucaoSql);
}
