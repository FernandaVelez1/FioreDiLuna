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
if (mysqli_query($conexion, $insertar)) {
    echo "EXITO!";
} else {
    echo "Hubo un error: " . mysqli_error($conexion);
}



?>