// --- 1. REGISTRO DE USUARIOS ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const mensaje = document.getElementById("mensaje");

    if (pass.length < 8) {
        mensaje.textContent = "La contraseña debe tener 8 caracteres.";
        mensaje.style.color = "red";
        return;
    }
    if (pass !== confirmPass) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        return;
    }

    // Guardar en base de datos local
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.find(u => u.correo === correo)) {
        mensaje.textContent = "El correo ya está registrado.";
        mensaje.style.color = "red";
        return;
    }

    usuarios.push({ nombre, correo, pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "¡Registro exitoso! Ahora inicia sesión.";
    mensaje.style.color = "green";

    setTimeout(() => { mostrarLogin(); e.target.reset(); }, 1500);
});

// --- 2. INICIO DE SESIÓN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo").value;
    const pass = document.getElementById("loginPassword").value;
    const mensajeLogin = document.getElementById("mensajeLogin");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.pass === pass);

    if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogueado", usuarioEncontrado.nombre); // Guarda el nombre real
        mensajeLogin.textContent = "¡Bienvenido " + usuarioEncontrado.nombre + "!";
        mensajeLogin.style.color = "green";
        setTimeout(() => { window.location.href = "../chiikawa.html"; }, 1000);
    } else {
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
        mensajeLogin.style.color = "red";
    }
});

// --- 3. NAVEGACIÓN ---
function mostrarRegistro(e) {
    if(e) e.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registroForm").style.display = "flex";
}

function mostrarLogin(e) {
    if(e) e.preventDefault();
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}

// --- 4. FUNCIÓN PARA CAMBIAR ENTRE PANTALLAS ---
function irALogin(event) {
    event.preventDefault();
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("contactoForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}