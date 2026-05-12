// --- 1. LÓGICA DE REGISTRO[cite: 1] ---
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Validación preventiva[cite: 1]

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    const mensaje = document.getElementById("mensaje");

    // ... (después de tus validaciones de contraseña)
    mensaje.textContent = "¡Registro exitoso! Pasando a contacto...";
    mensaje.style.color = "green";
    
    // Saltamos al siguiente formulario después de 1 segundo
    setTimeout(() => {
        document.getElementById("registroForm").style.display = "none";
        document.getElementById("contactoForm").style.display = "flex";
    }, 1000);

    // Validar que el email tenga un formato válido (regex)[cite: 1]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos
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

    // Asegurar que la contraseña tenga al menos 8 caracteres[cite: 1]
    if (pass.length < 8) {
        mensaje.textContent = "La contraseña debe tener al menos 8 caracteres.";
        mensaje.style.color = "red";
        return;
    }

    // Verificar que ambas contraseñas ingresadas sean idénticas[cite: 1]
    if (pass !== confirmPass) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        return;
    }

    mensaje.textContent = "¡Registro exitoso para " + nombre + "!";
    mensaje.style.color = "green";
    
    e.target.reset(); // Limpia los campos
});


// 2 LÓGICA DE LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value;
    const pass = document.getElementById("loginPassword").value;
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (correo === "" || pass === "") {
        mensajeLogin.textContent = "Por favor, completa todos los campos.";
        mensajeLogin.style.color = "red";
    } else {
        // Simulamos éxito y guardamos un nombre genérico o el capturado en registro
        localStorage.setItem("usuarioLogueado", "Kai"); // Aquí podrías usar el nombre del registro
        mensajeLogin.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
        mensajeLogin.style.color = "green";

        // Redirigir a la página principal tras 1.5 segundos
        setTimeout(() => {
            window.location.href = "../chiikawa.html";
        }, 1500);
    }
});


// --- 3. LÓGICA DE CONTACTO (Mejorada) ---
const mensajeInput = document.getElementById("contactoMensaje");
const contador = document.getElementById("contador");

// Implementar un contador de caracteres[cite: 1]
mensajeInput.addEventListener("input", function() {
    contador.textContent = mensajeInput.value.length;
});

document.getElementById("contactoForm").addEventListener("submit", function (e) {
    e.preventDefault(); //[cite: 1]

    // ... (después de validar que los campos no estén vacíos)
    mensajeContacto.textContent = "¡Mensaje enviado! Ya puedes iniciar sesión.";
    mensajeContacto.style.color = "green";

    // Saltamos al Login
    setTimeout(() => {
        document.getElementById("contactoForm").style.display = "none";
        document.getElementById("loginForm").style.display = "flex";
    }, 1500);

    const nombre = document.getElementById("contactoNombre").value;
    const telefono = document.getElementById("contactoTelefono").value;
    const correo = document.getElementById("contactoCorreo").value;
    // El asunto ahora no lo validaremos como obligatorio
    const mensaje = document.getElementById("contactoMensaje").value;
    const mensajeContacto = document.getElementById("mensajeContacto");

    // Validamos que los campos importantes no estén vacíos
    if (nombre === "" || telefono === "" || correo === "" || mensaje === "") {
        mensajeContacto.textContent = "Por favor, ingresa tu nombre, contacto, correo y mensaje.";
        mensajeContacto.style.color = "red";
        return;
    }

    mensajeContacto.textContent = "Mensaje enviado correctamente. ¡Te contactaremos pronto!";
    mensajeContacto.style.color = "green";

    // Limpiar los campos automáticamente[cite: 1]
    e.target.reset(); 
    contador.textContent = "0"; 
});


function irALogin(event) {
    event.preventDefault();
    document.getElementById("registroForm").style.display = "none";
    document.getElementById("contactoForm").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}