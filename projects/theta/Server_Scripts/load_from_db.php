<?php
function showSQLTable($host, $user, $password, $database, $pTableName){
	$connection = new mysqli($host, $user, $password, $database);
	if($connection->connect_errno)
		die($connection->mysqli_connect_error);
	$connection->query("SET NAMES 'utf8'");
	//$table = [];
	//$table[0] = getColumnName($connection, $tableName);
	$result = $connection->query("SELECT state FROM {$pTableName}  ORDER BY id DESC LIMIT 1");
	/*
	for($i=0;$i<$result->num_rows;$i++)
	{
		//$table[$i+1] = [];
		$aux = $result->fetch_assoc();
		for($j=0; $j<count($table[0]); $j++)
			$table[$i+1][$j] = $aux[$table[0][$j]];
	}
	*/
	$aux = $result->fetch_assoc();
	//return stripslashes($aux["state"]);
	return $aux["state"];
};

$tableName = json_decode(file_get_contents('php://input'));
echo showSQLTable("localhost","tilli","tilli","ens",$tableName);