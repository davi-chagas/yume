// sessão
function validarSessao() {
    // Accept multiple possible keys (compatibility between old/new names)
    var email = sessionStorage.EMAIL_USER || sessionStorage.email || sessionStorage.email_usuario;
    var nome = sessionStorage.NAME_USER || sessionStorage.NOME_USUARIO || sessionStorage.nome || sessionStorage.nomeUsuario;
    var username = sessionStorage.USERNAME_USER || sessionStorage.username;
    var id = sessionStorage.ID_USUARIO || sessionStorage.id || sessionStorage.usuario_id;
    var img = sessionStorage.IMG_USER || sessionStorage.IMG_URL || sessionStorage.url_imagem;

    var b_usuario = document.getElementById("b_usuario");

    // require at minimum an id + email to consider session valid
    if (id != null && email != null) {
        if (b_usuario && nome) b_usuario.innerHTML = nome;
        return true;
    }

    // if current page is login or cadastro, don't redirect
    var pathname = window.location.pathname || "";
    if (pathname.endsWith('/login.html') || pathname.endsWith('/cadastro.html') || pathname.endsWith('/') ) {
        return false;
    }

    // otherwise redirect to login
    window.location = "../login.html";
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar) divAguardar.style.display = "none";

    if (texto) {
        var divErrosLogin = document.getElementById("div_erros_login") || document.getElementById('cardErro') || document.getElementById('msg_error');
        if (divErrosLogin) {
            // if card element contains msg span, try to set innerHTML appropriately
            if (divErrosLogin.id === 'cardErro') {
                var span = document.getElementById('msg_error');
                if (span) span.innerHTML = texto;
                divErrosLogin.style.display = 'flex';
            } else {
                divErrosLogin.style.display = "flex";
                divErrosLogin.innerHTML = texto;
            }
        }
    }
}
