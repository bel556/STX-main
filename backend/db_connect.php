<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$dbname = "driving_school";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");

// For testing purposes (can be commented out in production)
// echo "Connected successfully using mysqli!";
?>
