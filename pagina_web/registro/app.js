// --- LÓGICA DE REGISTRO ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault(); // [cite: 7]

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const mensaje = document.getElementById("mensaje");

    // Expresión regular para validar Email [cite: 13]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones 
    if (nombre === "" || correo === "" || pass === "" || confirmPass === "") {
        mensaje.textContent = "Todos los campos son obligatorios.";
        mensaje.style.color = "red";
        return;
    }

    if (!emailRegex.test(correo)) {
        mensaje.textContent = "El formato del email no es válido.";
        mensaje.style.color = "red";
        return;
    }

    if (pass.length < 8) { // [cite: 14]
        mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
        mensaje.style.color = "red";
        return;
    }

    if (pass !== confirmPass) { // [cite: 15]
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        return;
    }

    // Si todo está correcto [cite: 19]
    mensaje.textContent = "¡Registro exitoso para " + nombre + "!";
    mensaje.style.color = "green";
    
    // Limpiar campos 
    e.target.reset();
});

// --- LÓGICA DE LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const pass = document.getElementById("loginPassword").value;
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (correo === "" || pass === "") {
        mensajeLogin.textContent = "Por favor, completa todos los campos.";
        mensajeLogin.style.color = "red";
    } else {
        mensajeLogin.textContent = "Ingresando correctamente...";
        mensajeLogin.style.color = "blue";

        // Esperamos 1.5 segundos (1500 milisegundos) y luego redirigimos
        setTimeout(function() {
            // Cambia "pagina_chiikawa.html" por el nombre exacto de tu archivo HTML de Chiikawa
            window.location.href = "pagina_web/chiikawa.html"; 
        }, 1500);
    }
});