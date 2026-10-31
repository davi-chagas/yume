var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua password está indefinida!");
    } else {

        usuarioModel.autenticar(email, password)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); 

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                               
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        username: resultadoAutenticar[0].cpf,
                                        name: resultadoAutenticar[0].name,
                                        password: resultadoAutenticar[0].password,
                                    });
                                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou password inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e password!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var password = req.body.passwordServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
    } else if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
     else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, username, email, password)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}