<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
		<title>Game Database</title>
		<style>
			body{max-width:1300px}
			.left{display:block;width:40%;float:left;box-sizing:border-box;padding:20px}
			.right{display:block;width:60%;float:left;box-sizing:border-box;padding:20px}
			.tSelect{background:#a7c117}
			table{border-collapse:collapse;table-layout:fixed;width:100%}
			table td{border:solid 1px #ddd;width:40%;word-wrap:break-word;cursor:pointer}
			table td:first-child{width:20%}
			table thead td{font-weight:bold;background:#ddd}
			table#gameDetailsTable .title{width:20%;font-weight:bold;background:#ccc}
			table#gameDetailsTable .description{width:80%}
		</style>
	</head>
	<body>
		<h1>Search:</h1>
		<form id="gameSearch">
			<input type="text" placeholder="Game Name" value="" name="gameName" />
			<input type="submit" value="Search" />
		</form>
		<br>
		<div class="left">
			<ul id="gameList">
			
			</ul>
		</div>
		<div class="right">
			<table id="gameDetailsTable"></table>
		</div>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> 
		<script type="text/javascript" src="scripts.js"></script>
	</body>
</html>