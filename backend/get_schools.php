<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$schools = [];

// Fetch all schools
$sql = "SELECT * FROM school";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($school = $result->fetch_assoc()) {
        $school_id = $school['school_id'];

        // Fetch licenses for this school
        $licenses = [];
        $l_sql = "SELECT l.license_type FROM license l 
                  JOIN school_license sl ON l.license_id = sl.license_id 
                  WHERE sl.school_id = $school_id";
        $l_res = $conn->query($l_sql);
        if ($l_res) {
            while ($l_row = $l_res->fetch_assoc()) {
                $licenses[] = $l_row['license_type'];
            }
        }
        $school['licenses'] = $licenses;

        // Fetch services for this school
        $services = [];
        $s_sql = "SELECT s.service_name FROM services s 
                  JOIN school_services ss ON s.service_id = ss.service_id 
                  WHERE ss.school_id = $school_id";
        $s_res = $conn->query($s_sql);
        if ($s_res) {
            while ($s_row = $s_res->fetch_assoc()) {
                $services[] = $s_row['service_name'];
            }
        }
        $school['services'] = $services;

        // Fetch documents for this school
        $documents = [];
        $d_sql = "SELECT d.document_name FROM documents d 
                  JOIN school_documents sd ON d.document_id = sd.document_id 
                  WHERE sd.school_id = $school_id";
        $d_res = $conn->query($d_sql);
        if ($d_res) {
            while ($d_row = $d_res->fetch_assoc()) {
                $documents[] = $d_row['document_name'];
            }
        }
        $school['documents'] = $documents;

        // Fetch social media for this school
        $social = [];
        $sm_sql = "SELECT sm.social_media_type, ssm.link FROM social_media sm 
                   JOIN school_social_media ssm ON sm.social_media_id = ssm.social_media_id 
                   WHERE ssm.school_id = $school_id";
        $sm_res = $conn->query($sm_sql);
        if ($sm_res) {
            while ($sm_row = $sm_res->fetch_assoc()) {
                $social[] = [
                    'type' => $sm_row['social_media_type'],
                    'link' => $sm_row['link']
                ];
            }
        }
        $school['social_media'] = $social;

        // Fetch timetable for this school
        $timetable = [];
        $t_sql = "SELECT t.day, t.opening, t.closing FROM timetable t 
                  JOIN school_timing st ON t.time_id = st.time_id 
                  WHERE st.school_id = $school_id";
        $t_res = $conn->query($t_sql);
        if ($t_res) {
            while ($t_row = $t_res->fetch_assoc()) {
                $timetable[] = [
                    'day' => $t_row['day'],
                    'opening' => $t_row['opening'],
                    'closing' => $t_row['closing']
                ];
            }
        }
        $school['timetable'] = $timetable;

        $schools[] = $school;
    }
}

echo json_encode($schools);
$conn->close();
?>