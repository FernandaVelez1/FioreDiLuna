$(document).ready(function() {
    $('#formularioLogin').submit(function(e) {
        e.preventDefault();

        // Configuración personalizada de SweetAlert
        const swalConfirm = Swal.mixin({
            background: '#fff5f7',
            iconColor: '#d23c7d',
            color: '#5a2a40',
            confirmButtonColor: '#d23c7d',
            cancelButtonColor: '#9e9e9e',
            buttonsStyling: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

        swalConfirm.fire({
            title: "¿Lista para disfrutar?",
            text: "Confirma que deseas iniciar sesión",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "¡Sí, ingresar!",
            cancelButtonText: "Cancelar",
            customClass: {
                container: 'swal-container',
                popup: 'swal-popup',
                title: 'swal-title',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'login.php',
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function(response) {
                        const respuesta = response.trim();
                        
                        if (respuesta === "success") {
                            // Alerta de éxito elegante
                            Swal.fire({
                                title: '¡Bienvenida de nuevo!',
                                text: 'Redirigiendo a tu cuenta...',
                                icon: 'success',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                background: '#fff5f7',
                                color: '#5a2a40',
                                iconColor: '#d23c7d',
                                willClose: () => {
                                    window.location.href = "index.html"; // Redirigir a la página de inicio
                                }
                            });
                        } else if (respuesta === "inactivo") {
                            swalConfirm.fire({
                                icon: "warning",
                                title: "Cuenta inactiva",
                                html: '<p style="color:#7d4a5a">Tu cuenta está inactiva.</p><p>Contacta a nuestro equipo de soporte.</p>',
                                confirmButtonText: "Entendido"
                            });
                        } else {
                            swalConfirm.fire({
                                icon: "error",
                                title: "Oops...",
                                html: '<p style="color:#7d4a5a">Correo o contraseña incorrectos</p>',
                                confirmButtonText: "Intentar nuevamente"
                            });
                        }
                    },
                    error: function() {
                        swalConfirm.fire({
                            icon: "error",
                            title: "Error de conexión",
                            html: '<p style="color:#7d4a5a">No pudimos conectar con el servidor</p>',
                            confirmButtonText: "Reintentar"
                        });
                    }
                });
            }
        });
    });

    // Redirigir al hacer clic en la "X"
    $('.bi-x').click(function() {
        window.location.href = 'index.html'; 
    });
});