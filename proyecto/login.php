<?php

session_start(); // Inicia la sesión
require("conexion.php");

$correo = $_POST['correo'];
$contrasenia = sha1($_POST['contrasenia']);

$sql = "SELECT id_registro, nombre FROM registros 
        WHERE correo = '$correo' 
        AND contrasenia = '$contrasenia'";

$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['user_id'] = $row['id_registro']; // Guarda ID en sesión
    $_SESSION['user_name'] = $row['nombre'];    // Guarda nombre en sesión
    echo "success";
} else {
    echo "error";
}
?>