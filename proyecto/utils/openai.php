
<?php
require_once __DIR__ . '/env.php';
loadEnv(__DIR__ . '/../.env');

function askOpenAI(string $prompt): string
{
    $apiKey = getenv('OPENAI_API_KEY'); // Ahora usa la variable de entorno

    $data = [
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'user', 'content' => $prompt]
        ],
        'max_tokens' => 100,
        'temperature' => 0.7,
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: ' . "Bearer {$apiKey}"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response, true);
    return $result['choices'][0]['message']['content'] ?? "Error en la respuesta de OpenAI.";
}
