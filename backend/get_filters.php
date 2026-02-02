<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$response = [
    'cities' => [],
    'licenses' => []
];

// Fetch unique cities from school table
$cityQuery = "SELECT DISTINCT city FROM school WHERE city IS NOT NULL AND city != '' ORDER BY city";
$cityResult = $conn->query($cityQuery);
if ($cityResult) {
    while ($row = $cityResult->fetch_assoc()) {
        $response['cities'][] = $row['city'];
    }
}

// Fetch license types from license table
$licenseQuery = "SELECT DISTINCT license_type FROM license ORDER BY license_type";
$licenseResult = $conn->query($licenseQuery);
if ($licenseResult) {
    while ($row = $licenseResult->fetch_assoc()) {
        $response['licenses'][] = $row['license_type'];
    }
}

echo json_encode($response);
$conn->close();
?>