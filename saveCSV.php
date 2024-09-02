<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $csvData = $_POST['csv'];

    // Split the data into individual lines
    $lines = explode(';', $csvData);

    // Define the CSV file path
    $filePath = 'data.csv';

    // Delete the previous CSV file if it exists
    if (file_exists($filePath)) {
        unlink($filePath); // Remove the file
    }
    
    // Open the CSV file in append mode
    $file = fopen('data.csv', 'w');

    // Check if the file opened successfully
    if ($file) {
        foreach ($lines as $line) {
            // Write each line to the CSV file
            fputcsv($file, explode(',', $line));
        }

        // Close the file
        fclose($file);

        echo "Data saved successfully!";
    } else {
        echo "Error opening the file.";
    }
} else {
    echo "Invalid request method.";
}
?>