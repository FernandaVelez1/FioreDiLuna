<?php
require_once __DIR__ . '/controllers/ChatbotController.php';

// Obtén la ruta relativa después de /proyecto/
$basePath = dirname($_SERVER['SCRIPT_NAME']);
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = '/' . trim(str_replace($basePath, '', $uri), '/');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $route === '/chatbot') {
    ChatbotController::chat();
    exit;
}
