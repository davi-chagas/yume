// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USER;
    var name = sessionStorage.NAME_USER;
    var username = sessionStorage.USERNAME_USER;

    var b_usuario = document.getElementById("b_usuario");
    var c_usuario = document.getElementById("c_usuario");
    var d_usuario = document.getElementById("d_usuario");

    if (email != null && name != null && username != null) {
        b_usuario.innerHTML = name;
        c_usuario.innerHTML = email;
        c_usuario.innerHTML = username;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

