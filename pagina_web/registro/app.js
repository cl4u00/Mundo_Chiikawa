// --- 1. LÓGICA DE REGISTRO ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const mensaje = document.getElementById("mensaje");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos
    if (nombre === "" || correo === "" || pass === "" || confirmPass === "") {
        mensaje.textContent = "Todos los campos son obligatorios.";
        mensaje.style.color = "red";
        return;
    }

    // Validación de formato email
    if (!emailRegex.test(correo)) {
        mensaje.textContent = "El formato del email no es válido.";
        mensaje.style.color = "red";
        return;
    }

    // NUEVA RESTRICCIÓN: Dominio mínimo 3 letras (ej: pepe@abc.com)
    const partes = correo.split('@');
    const dominioNombre = partes[1].split('.')[0]; 
    if (dominioNombre.length < 3) {
        mensaje.textContent = "El dominio (ej: 'abc' en abc.com) debe tener mínimo 3 letras.";
        mensaje.style.color = "red";
        return;
    }

    if (pass.length < 8) {
        mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
        mensaje.style.color = "red";
        return;
    }

    if (pass !== confirmPass) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        return;
    }

    // Guardar usuario real
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push({ nombre, correo, pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "¡Registro exitoso! Ahora inicia sesión.";
    mensaje.style.color = "green";
    
    setTimeout(() => { mostrarLogin(); e.target.reset(); }, 1500);
});

// --- 2. LÓGICA DE LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo").value;
    const pass = document.getElementById("loginPassword").value;
    const mensajeLogin = document.getElementById("mensajeLogin");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo && u.pass === pass);

    if (usuario) {
        localStorage.setItem("usuarioLogueado", usuario.nombre);
        mensajeLogin.textContent = "¡Bienvenido " + usuario.nombre + "!";
        mensajeLogin.style.color = "green";
        setTimeout(() => { window.location.href = "../chiikawa.html"; }, 1000);
    } else {
        mensajeLogin.textContent = "Correo o contraseña incorrectos.";
        mensajeLogin.style.color = "red";
    }
});

// --- 3. LÓGICA DE CONTACTO ---
document.getElementById("contactoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const mensajeContacto = document.getElementById("mensajeContacto");
    mensajeContacto.textContent = "¡Mensaje enviado con éxito!";
    mensajeContacto.style.color = "green";
    setTimeout(() => { window.location.href = "../chiikawa.html"; }, 1500);
});

// --- 4. CONTROL DE VISTAS ---
function mostrarRegistro(e) {
    if(e) e.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("contactoForm").style.display = "none";
    document.getElementById("registroForm").style.display = "flex";
}

function mostrarLogin(e) {
    if(e) e.preventDefault();
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("contactoForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}

// Detectar si venimos desde "Escríbenos" del footer
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'contacto') {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("contactoForm").style.display = "flex";
    }
};

// --- 4. FUNCIÓN PARA CAMBIAR ENTRE PANTALLAS ---
function irALogin(event) {
    event.preventDefault();
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("contactoForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}