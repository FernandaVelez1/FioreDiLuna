<?php
require "conexion.php";

// Recoger datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$fecha_nac = $_POST['fecha_nac'];
$contrasenia = sha1($_POST['contrasenia']);
$estado = $_POST['estado'] ?? 'activo'; // Valor por defecto si no se envía
$correo = $_POST['correo'];

// Consulta para insertar datos
$insertar = "INSERT INTO registros (nombre, apellido, fecha_nac, contrasenia, estado, correo) 
             VALUES ('$nombre', '$apellido', '$fecha_nac', '$contrasenia', '$estado', '$correo')";

// Ejecutar consulta
$registro_exitoso = mysqli_query($conexion, $insertar);

if ($registro_exitoso) {
    session_start();
    $_SESSION['user_name'] = $nombre; // O el campo que uses para mostrar la inicial
    echo "EXITO!";
} else {
    echo "Error al registrar usuario";
}

?>