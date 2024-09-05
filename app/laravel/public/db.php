<?php
const DB_HOST = 'db';
const DB_NAME = 'database';
const DB_USER = 'user';
const DB_PASSWORD = 'test';

try {
    $dbh = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
    echo 'Connection successful.';
} catch (PDOException $e) {
    echo $e->getMessage();
    exit;
}
