var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.passwordServer || req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                        id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            username: resultadoAutenticar[0].username,
                            nome: resultadoAutenticar[0].nome,
                            url_imagem: resultadoAutenticar[0].url_imagem,
                            senha: resultadoAutenticar[0].senha,
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
    var senha = req.body.passwordServer || req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
    } else if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }
    else {

        usuarioModel.cadastrar(nome, username, email, senha)
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

function atualizarUsuario(req, res) {
    var nome = req.body.name;
    var username = req.body.username;
    var url_imagem = req.file ? `/assets/${req.file.filename}` : null;
    var email = req.body.email;
    var user_id = req.params.user_id;

    usuarioModel.update(nome, username, url_imagem, email, user_id)
        .then(function (result) {
            res.json({ url_imagem: url_imagem });
        })
        .catch(function (err) {
            console.log(err);
            console.log(
                "\nHouve um erro ao realizar a edição! Erro: ",
                err.sqlMessage
            );
            res.status(500).json(err.sqlMessage);
        })

}

module.exports = {
    autenticar,
    cadastrar,
    atualizarUsuario
}
