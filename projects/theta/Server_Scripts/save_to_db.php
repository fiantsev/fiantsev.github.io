<?php
function updateSQLTable($host, $user, $password, $database, $tableName, $state){
	$connection = new mysqli($host, $user, $password, $database);
	if($connection->connect_errno)
		die($connection->mysqli_connect_error);
	$connection->query("SET NAMES 'utf8'");
	if(!empty($state))
	{
		$q = "INSERT INTO {$tableName}(state) VALUES ('{$state}')";
		//echo $q;echo "\n";
		if(!$connection->query($q)) echo $connection->info.$connection->error;
	}
	$connection->close();
};
//print_r(file_get_contents('php://input'));echo "\n";
$param = json_decode(file_get_contents('php://input'));
$tableName = $param[0];
//echo "[0]: ";print_r($tableName);echo "\n";
$state = json_encode($param[1], JSON_UNESCAPED_UNICODE);
//echo "[1]: ";print_r($state);echo "\n";
$state = addslashes($state);
//echo "[1]: ";print_r($state);echo "\n";
updateSQLTable("localhost","tilli","tilli","ens", $tableName, $state);