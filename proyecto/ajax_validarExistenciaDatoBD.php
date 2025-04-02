<?php
require("conexion.php");

$correo = $_POST['correo']; 
$respuesta = array();

$verificar_Correo = mysqli_query($conexion, "SELECT * FROM registros WHERE correo = '$correo'");
if (mysqli_num_rows($verificar_Correo) > 0) {
    $respuesta['existe'] = true;
    $respuesta["mensaje"] = "Este correo ya está registrado. Intenta con otro.";
} else {
    $respuesta['existe'] = false;
    $respuesta["mensaje"] = "";
}

echo json_encode($respuesta);
?>