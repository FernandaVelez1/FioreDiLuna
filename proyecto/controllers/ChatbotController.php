<?php
require_once __DIR__ . '/../utils/openai.php';

class ChatbotController
{
    public static function chat()
    {
        header('Content-Type: application/json');

        $body = json_decode(file_get_contents('php://input'), true);
        $message = $body['message'] ?? null;

        if (!$message) {
            http_response_code(400);
            echo json_encode(['error' => 'El mensaje es obligatorio.']);
            return;
        }

        $normalized = strtolower(preg_replace(
            ['/\p{Mn}/u', '/[^a-z0-9\s]/'],
            ['', ''],
            normalizer_normalize($message, Normalizer::FORM_D)
        ));

        $keywords = ['recomienda', 'recomendacion', 'precio', 'descuento', 'quiero', 'necesito'];
        $isRecommendation = false;
        foreach ($keywords as $kw) {
            if (strpos($normalized, $kw) !== false) {
                $isRecommendation = true;
                break;
            }
        }

        if ($isRecommendation) {
            // Aquí iría el acceso a tu base de datos (por ejemplo con PDO)
            // Para el ejemplo, usaremos productos ficticios
            $products = [
                ['id' => 1, 'name' => 'Camiseta Azul', 'price' => 199, 'discount' => 10],
                ['id' => 2, 'name' => 'Pantalón Negro', 'price' => 299, 'discount' => 20],
                ['id' => 3, 'name' => 'Falda Roja', 'price' => 179, 'discount' => 0],
            ];

            $descriptions = array_map(function($p) {
                return "id: {$p['id']}, nombre: {$p['name']}, precio: {$p['price']}, descuento: {$p['discount']}%";
            }, $products);
            $descString = implode("\n", $descriptions);

            $prompt1 = "El usuario quiere una recomendación. Productos:\n{$descString}\nMensaje: \"{$message}\".";

            $response1 = askOpenAI($prompt1);
            echo json_encode(['response' => $response1]);
            return;
        }

        // Otras condiciones como talla se pueden agregar aquí...

        $generic = askOpenAI("Mensaje del usuario: \"{$message}\". Responde de forma amable y breve.");
        echo json_encode(['response' => $generic]);
    }
}