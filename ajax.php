<?php

    error_reporting(E_ALL);
    ini_set('display_errors',1);
	
	$type = isset($_POST["type"]) ? htmlspecialchars(strip_tags(trim($_POST["type"]))) : "";
	
	/*$developers_id = $value->developers;
	$publishers_id = $value->publishers;
	$game_engines_id = $value->game_engines;
	$genres_id = $value->genres;
	$category = $value->category;
	$player_perspectives_id = $value->player_perspectives;
	$game_mode_id = $value->game_modes;
	$first_release_date = $value->first_release_date;
	$release_dates_arr = $value->release_dates;
	$screenshots_arr = $value->screenshots;
	$videos_arr = $value->videos;
	$websites_arr = $value->websites;
	$cover = $value->cover;*/
	
	//https://images.igdb.com/igdb/image/upload/t_cover_big/mdeqyhinxuqkalxt7rkh.jpg
	//https://images.igdb.com/igdb/image/upload/t_screenshot_big/cg2ohcieecgfmxiww3ha.jpg
	
	if($type != ""){
		switch($type){
			case "search":
				$name = isset($_POST["name"]) ? htmlspecialchars(strip_tags(trim($_POST["name"]))) : "";
				echo searchGame($name);
				break;
			case "getGameDetails":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getGameDetails($id);
				break;
			case "getDevelopers":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getDevelopers($id);
				break;
			case "getPublishers":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getPublishers($id);
				break;
			case "getGameEngines":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getGameEngines($id);
				break;
			case "getGenres":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getGenres($id);
				break;
			case "getPlayerPerspectives":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getPlayerPerspectives($id);
				break;
			case "getGameModes":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getGameModes($id);
				break;
			case "getPlatforms":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getPlatforms($id);
				break;
			case "getThemes":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getThemes($id);
				break;
			case "getSeries":
				$id = isset($_POST["id"]) ? htmlspecialchars(strip_tags(trim($_POST["id"]))) : "";
				echo getSeries($id);
				break;
		}
	}

	function searchGame($name){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=" . $name;
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body, JSON_UNESCAPED_UNICODE);
	}
	
	function getGameDetails($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getDevelopers($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/companies/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getPublishers($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/companies/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getGameEngines($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/game_engines/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getGenres($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/genres/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getPlayerPerspectives($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/player_perspectives/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getGameModes($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/game_modes/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getPlatforms($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/platforms/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getThemes($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/themes/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}
	
	function getSeries($id){
		require_once 'src/Unirest.php';
		
		$url = "https://igdbcom-internet-game-database-v1.p.mashape.com/collections/".$id."?fields=*";
		
		$response = Unirest\Request::get($url,array("X-Mashape-Key" => "mcmeNg4FLgmshfhw2J62sZCXN0u3p1ZsyF2jsnJttYv7ruXKqZ","Accept" => "application/json"));
		$body = (array)$response->body;
		
		return json_encode($body[0], JSON_UNESCAPED_UNICODE);
	}