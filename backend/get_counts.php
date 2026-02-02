<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$response = [
    'schoolsCount' => 0,
    'citiesCount' => 0,
    'licensesCount' => 0
];

// Count total schools
$schoolQuery = "SELECT COUNT(*) as total FROM school";
$schoolResult = $conn->query($schoolQuery);
if ($schoolResult) {
    $row = $schoolResult->fetch_assoc();
    $response['schoolsCount'] = (int) $row['total'];
}

// Count unique cities
$cityQuery = "SELECT COUNT(DISTINCT city) as total FROM school WHERE city IS NOT NULL AND city != ''";
$cityResult = $conn->query($cityQuery);
if ($cityResult) {
    $row = $cityResult->fetch_assoc();
    $response['citiesCount'] = (int) $row['total'];
}

// Count unique license types
$licenseQuery = "SELECT COUNT(*) as total FROM license";
$licenseResult = $conn->query($licenseQuery);
if ($licenseResult) {
    $row = $licenseResult->fetch_assoc();
    $response['licensesCount'] = (int) $row['total'];
}

echo json_encode($response);
$conn->close();
?>