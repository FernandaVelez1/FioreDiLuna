
    // Configuración del tema rosa elegante para SweetAlert
    const swalRosa = Swal.mixin({
        background: '#fff5f7',
        color: '#5a2a40',
        iconColor: '#d23c7d',
        confirmButtonColor: '#d23c7d',
        cancelButtonColor: '#9e9e9e',
        buttonsStyling: true,
        customClass: {
            container: 'swal-rosa-container',
            popup: 'swal-rosa-popup',
            title: 'swal-rosa-title',
            confirmButton: 'swal-rosa-confirm',
            cancelButton: 'swal-rosa-cancel'
        }
    });

    // Verificar si el correo ya existe
    function verificarCorreoBD(correo) {
        if (correo.length > 0) {
            $.ajax({
                url: './ajax_validarCorreoBD.php',
                method: 'POST',
                data: { correo: correo },
                dataType: 'json',
                success: function(respuesta) {
                    let idCorreo = document.getElementById("correo");
                    let mensajeErrorEmail = document.getElementById("mensaje-error-correo");
                    let btnCrearCuenta = document.getElementById("btnCrearCuenta");
                    
                    idCorreo.classList.remove("border-error");
                    mensajeErrorEmail.textContent = "";
                    btnCrearCuenta.disabled = false;
                    
                    if (respuesta.existe) {
                        idCorreo.classList.add("border-error");
                        mensajeErrorEmail.textContent = respuesta.mensaje;
                        mensajeErrorEmail.style.color = "#d23c7d";
                        btnCrearCuenta.disabled = true;
                    }
                },
                error: function() {
                    console.error("Error al verificar el correo.");
                }
            });
        }
    }

    // Función para validar la contraseña
    function validarContrasenia() {
        const contrasenia = $("#contrasenia").val();
        const mensajeError = $("#mensaje-error-contrasenia");
        
        // Reiniciar mensajes
        mensajeError.text("");
        
        // Validar requisitos
        const tieneLongitud = contrasenia.length >= 8;
        const tieneMayuscula = /[A-Z]/.test(contrasenia);
        const tieneNumero = /[0-9]/.test(contrasenia);
        const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasenia);
        
        // Actualizar visualización de requisitos
        $("#req-longitud").toggleClass("valido", tieneLongitud);
        $("#req-mayuscula").toggleClass("valido", tieneMayuscula);
        $("#req-numero").toggleClass("valido", tieneNumero);
        $("#req-especial").toggleClass("valido", tieneEspecial);
        
        // Verificar si cumple todos los requisitos
        if (!tieneLongitud || !tieneMayuscula || !tieneNumero || !tieneEspecial) {
            mensajeError.text("La contraseña no cumple todos los requisitos");
            mensajeError.css("color", "#d23c7d");
            return false;
        }
        
        return true;
    }

    // Función para validar confirmación de contraseña
    function validarConfirmacionContrasenia() {
        const contrasenia = $("#contrasenia").val();
        const confirmacion = $("#confirmar_contrasenia").val();
        const mensajeError = $("#mensaje-error-confirmacion");
        
        if (contrasenia !== confirmacion) {
            mensajeError.text("Las contraseñas no coinciden");
            mensajeError.css("color", "#d23c7d");
            return false;
        }
        
        mensajeError.text("");
        return true;
    }

    // Validar formulario antes de enviar
    $(document).ready(function() {
        $("#btnCrearCuenta").click(function(e) {
            e.preventDefault();
            
            // Validar contraseña
            if (!validarContrasenia()) {
                $("#contrasenia").focus();
                return;
            }
            
            // Validar confirmación
            if (!validarConfirmacionContrasenia()) {
                $("#confirmar_contrasenia").focus();
                return;
            }
            
            // Validar política de privacidad
            if (!$("#privacidad").is(":checked")) {
                swalRosa.fire({
                    icon: "error",
                    title: "Política de privacidad",
                    html: '<p style="color:#7d4a5a">Debes aceptar la política de privacidad</p>',
                    confirmButtonText: "Entendido"
                });
                return;
            }
            
            // Validar que el correo no esté registrado
            if ($("#mensaje-error-correo").text() === "Este correo ya está registrado.") {
                swalRosa.fire({
                    icon: "error",
                    title: "Correo registrado",
                    html: '<p style="color:#7d4a5a">El correo electrónico ya está registrado</p>',
                    confirmButtonText: "Entendido"
                });
                return;
            }
            
            // Confirmar envío con diseño rosa elegante
            swalRosa.fire({
                title: "¿Crear nueva cuenta?",
                html: '<p style="color:#7d4a5a">Confirma que deseas registrarte en Fiore Di Luna</p>',
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "¡Sí, registrarme!",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Enviar datos
                    $.ajax({
                        url: 'registro.php',
                        method: 'POST',
                        data: {
                            nombre: $("#nombre").val(),
                            apellido: $("#apellido").val(),
                            correo: $("#correo").val(),
                            fecha_nac: $("#fecha_nac").val(),
                            contrasenia: $("#contrasenia").val(),
                            estado: 'activo'
                        },
                        success: function(response) {
                            console.log(response);
                            if (response.trim() === "EXITO!") {
                                swalRosa.fire({
                                    title: "¡Bienvenida a Fiore Di Luna!",
                                    html: '<p style="color:#7d4a5a">Tu cuenta ha sido creada con éxito</p>',
                                    icon: "success",
                                    confirmButtonText: "Comenzar",
                                    timer: 3000,
                                    timerProgressBar: true,
                                    willClose: () => {
                                        window.location.href = "index.php";
                                    }
                                });
                            } else {
                                swalRosa.fire({
                                    icon: "error",
                                    title: "Error al crear cuenta",
                                    html: `<p style="color:#7d4a5a">${response}</p>`,
                                    confirmButtonText: "Entendido"
                                });
                            }
                        },
                        error: function(xhr, status, error) {
                            swalRosa.fire({
                                icon: "error",
                                title: "Error de conexión",
                                html: '<p style="color:#7d4a5a">Hubo un problema con el servidor</p>',
                                confirmButtonText: "Reintentar"
                            });
                            console.error("Error en la solicitud:", status, error);
                        }
                    });
                }
            });
        });
    });
