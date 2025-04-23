<?php
$conexion= mysqli_connect('localhost', 'root', '', 'fiorediluna'); // Cambia los parámetros según tu configuración
if (!$conexion) {
    echo " error ";
    die("Error de conexión: " . mysqli_connect_error());
 }
?>