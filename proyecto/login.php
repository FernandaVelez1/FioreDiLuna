<?php
require("conexion.php");

// 1. Recibir datos del formulario
$correo = $_POST['correo'];
$contrasenia = sha1($_POST['contrasenia']); // Usando el mismo hash que en registro

// 2. Consulta para verificar credenciales
$sql = "SELECT id_registro FROM registros 
        WHERE correo = '$correo' 
        AND contrasenia = '$contrasenia'";

$result = $conexion->query($sql);

// 3. Verificar resultado
if ($result->num_rows > 0) {
    // Credenciales correctas
    echo "success";
} else {
    // Credenciales incorrectas
    echo "error";
}

// 4. Cerrar conexión

?>