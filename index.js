function ValidarSesion(event) {
    event.preventDefault();

    const usuarios = ['admin@drogueria.com', 'user1@drogueria.com', 'user2@drogueria'];
    const contraseñas = ['Admin123*', 'Contraseña1*', 'Contraseña2*'];

    const usuarioInput = document.getElementById('usuario').value;
    const contraseñaInput = document.getElementById('contraseña').value;
    const mensaje = document.getElementById('Mensaje');

    // Se muestra el mensaje cargando
    mensaje.innerText = 'Cargando....';

    const validarCredenciales = (usuario, contraseña) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const usuarioIndex = usuarios.indexOf(usuario);
                if (document.getElementById('mensaje-validacion').innerHTML !== '') {
                    // Muestra el mensaje de validación
                    mensaje.innerHTML = 'La contraseña no cumple con las características requeridas';
                    reject('La contraseña no cumple con las características requeridas');
                    return;
                }

                if (contraseña.length < 8) {
                    // Cuando la contraseña es menor a 8 caracteres arroja mensaje
                    reject('La contraseña es muy corta');
                } else if (usuarioIndex !== -1 && contraseñas[usuarioIndex] === contraseña) {
                    // La condición de este codigo es que el usuario y la contraseña deben ser iguales
                    // si no es igual continua con la siguiente linea 
                    resolve('¡Inicio de sesión exitoso!');
                } else {
                    // Usuario o contraseña incorrectos, rechazar la promesa
                    reject('Usuario o contraseña incorrectos');
                }
            }, 2000);
        });
    };

    validarCredenciales(usuarioInput, contraseñaInput)
        .then((mensaje) => {
            // Ocultar el mensaje de Cargando y mostrar el mensaje de éxito
            mensaje.innerText = mensaje;
            window.location.href = 'inicio.html';
        })
        .catch((error) => {
            // Ocultar el mensaje de Cargando y mostrar el mensaje de error
            mensaje.innerText = error;
        });
}

function Limpiar() {
    document.getElementById('usuario').value = '';
    document.getElementById('contraseña').value = '';
    document.getElementById('Mensaje').innerText = '';
}

document.getElementById('contraseña').addEventListener('input', validarContrasena);

function validarContrasena() {
    const contraseñaInput = document.getElementById('contraseña').value;
    const mensajeValidacion = document.getElementById('mensaje-validacion');

    const tieneMayuscula = /[A-Z]/.test(contraseñaInput);
    const tieneMinuscula = /[a-z]/.test(contraseñaInput);
    const tieneNumero = /\d/.test(contraseñaInput);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contraseñaInput);
   

    let mensaje = '';

    if (!tieneMayuscula) {
        mensaje += 'Debe contener al menos una mayúscula. <br>';
    }

    if (!tieneMinuscula) {
        mensaje += 'Debe contener al menos una minúscula. <br>';
    }

    if (!tieneNumero) {
        mensaje += 'Debe contener al menos un número. <br>';
    }

    if (!tieneCaracterEspecial) {
        mensaje += 'Debe contener al menos un carácter especial. ';
    }

    mensajeValidacion.innerHTML = mensaje;

}
