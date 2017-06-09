$(document).ready(function() {
	$('#gameSearch').on('submit', function(e){
		e.preventDefault();
		
		var gameName = $('input[name="gameName"]').val();
		var limit = $('select[name="limit"] option:selected').val();
		
		$.ajax({
			type: "POST",
			url: "ajax.php",
			dataType: "json",
			data: "type=search&name=" + gameName + "&limit=" + limit,
			success: function(data) {
				//console.log(data);
				$('#gameList').html('');
				
				$(data).each(function(index, element){
					$('#gameList').append('<li><a href="javascript:void(0);" onclick="getGameDetails('+element.id+')">'+element.name+'</a></li>');
				});
			},
			error: function(err){
				console.log(err);
			}
		});
	});
	
	$('#gameDetailsTable').on('click', 'td', function() {
		if($(this).hasClass('tElem')){
			$('.tElem').removeClass('tSelect');
			$(this).addClass('tSelect');
			console.log($(this).text());
			copyToClipboard($(this).text());
		}
	});
});

function getGameDetails(gameId){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		data: "type=getGameDetails&id=" + gameId,
		success: function(data) {
			console.log(data);
			
			var developers = "", publishers = "", game_engines = "", genres = "", platforms = "", player_perspectives = "", game_modes = "", first_release_date = "", release_dates = "", websites = "", cover = "", videos = "", screenshots = "", themes = "", series = "", platforms = "", categories = "", websites_categories = "", cover_id = "", videos_id = "", screenshots_id = "", rel_date_plat = "", website_url_cat = "", cover_url_id = "", video_name_id = "", screenshot_url_id = "";	
	
			var devTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.developers).each(function(dInd,dElem){
				getDevelopers(dElem, function(devInfo){
					developers += devInfo.name + ", ";
					
					devTable += '<tr><td class="tElem">'+devInfo.name+'</td></tr>';
				});
			});
			
			devTable += '</tbody></table>';
			
			var pubTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.publishers).each(function(pInd,pElem){
				getPublishers(pElem, function(pubInfo){
					publishers += pubInfo.name + ", ";
					
					pubTable += '<tr><td class="tElem">'+pubInfo.name+'</td></tr>';
				});
			});
			
			pubTable += '</tbody></table>';
			
			var geTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.game_engines).each(function(geInd,geElem){
				getGameEngines(geElem, function(geInfo){
					game_engines += geInfo.name + ", ";
					
					geTable += '<tr><td class="tElem">'+geInfo.name+'</td></tr>';
				});
			});
			
			geTable += '</tbody></table>';
			
			var gTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.genres).each(function(gInd,gElem){
				getGenres(gElem, function(gInfo){
					genres += gInfo.name + ", ";
					
					gTable += '<tr><td class="tElem">'+gInfo.name+'</td></tr>';
				});
			});
			
			gTable += '</tbody></table>';
			
			var ppTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.player_perspectives).each(function(ppInd,ppElem){
				getPlayerPerspectives(ppElem, function(ppInfo){
					player_perspectives += ppInfo.name + ", ";
					
					ppTable += '<tr><td class="tElem">'+ppInfo.name+'</td></tr>';
				});
			});
			
			ppTable += '</tbody></table>';
			
			var gmTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.game_modes).each(function(gmInd,gmElem){
				getGameModes(gmElem, function(gmInfo){
					game_modes += gmInfo.name + ", ";
					
					gmTable += '<tr><td class="tElem">'+gmInfo.name+'</td></tr>';
				});
			});
			
			gmTable += '</tbody></table>';
			
			var frdTable = '<table><thead><tr><td>Date</td></tr></thead><tbody>';
			
			first_release_date = data.first_release_date;
			first_release_date = EpochToDate(first_release_date);
			var frd = new Date(first_release_date);
			first_release_date = frd.getDate() + "-" + (frd.getMonth()+1) + "-" + frd.getFullYear() + ", ";
			
			frdTable += '<tr><td class="tElem">'+first_release_date+'</td></tr>';
			
			frdTable += '</tbody></table>';
			
			var pTable = '<table><thead><tr><td>Date</td><td>Name</td></tr></thead><tbody>';
			
			$(data.release_dates).each(function(rdInd,rdElem){
				var rd = new Date(rdElem.human);
				release_date = rd.getDate() + "-" + (rd.getMonth()+1) + "-" + rd.getFullYear();
				
				release_dates += release_date + ", ";
				
				getPlatforms(rdElem.platform, function(pltInfo){
					platforms += pltInfo.name + ", ";
					rel_date_plat += "[" + release_date + "] - " + pltInfo.name + ", ";
					
					pTable += '<tr><td class="tElem">'+release_date+'</td><td class="tElem">'+pltInfo.name+'</td></tr>';
				});
			});
			
			pTable += '</tbody></table>';
			
			var tTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			$(data.themes).each(function(tInd,tElem){
				getThemes(tElem, function(tInfo){
					themes += tInfo.name + ", ";
					
					tTable += '<tr><td class="tElem">'+tInfo.name+'</td></tr>';
				});
			});
			
			tTable += '</tbody></table>';
			
			var sTable = '<table><thead><tr><td>Name</td></tr></thead><tbody>';
			
			getSeries(data.collection, function(sInfo){
				series += sInfo.name + ", ";
				
				sTable += '<tr><td class="tElem">'+sInfo.name+'</td></tr>';
			});
			
			sTable += '</tbody></table>';
			
			var wTable = '<table><thead><tr><td>URL</td></tr></thead><tbody>';
			
			$(data.websites).each(function(wInd,wElem){
				websites += wElem.url + ", ";
				websites_categories += wElem.category + ", ";
				
				website_url_cat += "[" + wElem.category + "] - " + wElem.url + ", ";
				
				wTable += '<tr><td class="tElem">'+wElem.url+'</td></tr>';
			});		

			wTable += '</tbody></table>';
			
			var cTable = '<table><thead><tr><td>Thumbnail</td><td>Cover</td><td>Image</td></tr></thead><tbody>';
			
			cover = data.cover.url + ", ";
			cover_id = data.cover.cloudinary_id + ", ";
			
			cover_url_id = "[" + data.cover.cloudinary_id + "] - " + data.cover.url + ", ";
			
			var cCover = data.cover.url.replace('t_thumb','t_cover_big');
			var cImage = data.cover.url.replace('t_thumb','t_screenshot_big');
			cTable += '<tr><td><img src="'+data.cover.url+'"/></td><td class="tElem">'+cCover+'</td><td class="tElem">'+cImage+'</td></tr>';
			
			cTable += '</tbody></table>';
			
			var vTable = '<table><thead><tr><td>Title</td><td>URL</td></tr></thead><tbody>';
			
			$(data.videos).each(function(vInd,vElem){
				videos += vElem.name + ", ";
				videos_id += vElem.video_id + ", ";
				
				video_name_id += "[" + vElem.video_id + "] - " + vElem.name + ", ";
				
				vTable += '<tr><td class="tElem">'+vElem.name+'</td><td class="tElem">https://www.youtube.com/watch?v='+vElem.video_id+'</td></tr>';
			});
			
			vTable += '</tbody></table>';
			
			var sshotTable = '<table><thead><tr><td>Thumbnail</td><td>Cover</td><td>Image</td></tr></thead><tbody>';
			
			$(data.screenshots).each(function(sInd,sElem){
				screenshots += sElem.url + ", ";
				screenshots_id += sElem.cloudinary_id + ", ";
				
				screenshot_url_id += "[" + sElem.cloudinary_id + "] - " + sElem.url + ", ";
				
				var sshotThumb = "http://images.igdb.com/igdb/image/upload/t_thumb/"+sElem.cloudinary_id+".jpg";
				var sshotCover = "http://images.igdb.com/igdb/image/upload/t_cover_big/"+sElem.cloudinary_id+".jpg";
				var sshotImage = "http://images.igdb.com/igdb/image/upload/t_screenshot_big/"+sElem.cloudinary_id+".jpg";
				sshotTable += '<tr><td><img src="'+sshotThumb+'"/></td><td class="tElem">'+sshotCover+'</td><td class="tElem">'+sshotImage+'</td></tr>';
			});
			
			sshotTable += '</tbody></table>';
			
			showGameDetailsTable(devTable, pubTable, geTable, gTable, ppTable, gmTable, frdTable, pTable, tTable, sTable, wTable, cTable, vTable, sshotTable);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function showGameDetailsTable(devTable, pubTable, geTable, gTable, ppTable, gmTable, frdTable, pTable, tTable, sTable, wTable, cTable, vTable, sshotTable){
	$('#gameDetailsTable').html('<tr><td class="title">Developers</td><td class="description" id="devInfo"><span>'+devTable+'</span></td></tr>'+
								'<tr><td class="title">Publishers</td><td class="description" id="pubInfo"><span>'+pubTable+'</span></td></tr>'+
								'<tr><td class="title">Game Engines</td><td class="description" id="geInfo"><span>'+geTable+'</span></td></tr>'+
								'<tr><td class="title">Genres</td><td class="description" id="genInfo"><span>'+gTable+'</span></td></tr>'+
								'<tr><td class="title">Platform</td><td class="description" id="pInfo"><span>'+pTable+'</span></td></tr>'+
								'<tr><td class="title">Player Perspectives</td><td class="description" id="ppInfo"><span>'+ppTable+'</span></td></tr>'+
								'<tr><td class="title">Game Modes</td><td class="description" id="gmInfo"><span>'+gmTable+'</span></td></tr>'+
								'<tr><td class="title">First Release Date</td><td class="description" id="frsInfo"><span>'+frdTable+'</span></td></tr>'+
								'<tr><td class="title">Themes</td><td class="description" id="tInfo"><span>'+tTable+'</span></td></tr>'+
								'<tr><td class="title">Series</td><td class="description" id="sInfo"><span>'+sTable+'</span></td></tr>'+
								'<tr><td class="title">Websites</td><td class="description" id="wInfo"><span>'+wTable+'</span></td></tr>'+
								'<tr><td class="title">Cover</td><td class="description" id="cInfo"><span>'+cTable+'</span></td></tr>'+
								'<tr><td class="title">Videos</td><td class="description" id="vInfo"><span>'+vTable+'</span></td></tr>'+
								'<tr><td class="title">Screenshots</td><td class="description" id="sInfo">'+sshotTable+'</td></tr>');
}

function getDevelopers(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getDevelopers&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getPublishers(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getPublishers&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getGameEngines(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getGameEngines&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getGenres(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getGenres&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getPlayerPerspectives(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getPlayerPerspectives&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getGameModes(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getGameModes&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getPlatforms(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getPlatforms&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getThemes(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getThemes&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getSeries(id, callback){
	$.ajax({
		type: "POST",
		url: "ajax.php",
		dataType: "json",
		async: false,
		data: "type=getSeries&id=" + id,
		success: function(data) {
			console.log(data);
			callback(data);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getDataId(data){
	var dId = $(data).split(' - ')[0];
	return dId.substring(1, dId.length-1);
}

function getDataUrl(data){
	return $(data).split(' - ')[1];
}

function EpochToDate(epoch) {
    if (epoch < 10000000000){
        epoch *= 1000;
	}
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone    
    
    return new Date(epoch);
}

function copyToClipboard(elem) {
    var targetId = "_copiedText_";
    target = document.getElementById(targetId);
	
	if(!target){
		var target = document.createElement("textarea");
		target.id = targetId;
		target.style.position = "absolute";
		target.style.left = "-9999px";
		target.style.bottom = "0";
		document.body.appendChild(target);
	}
	
	target.textContent = elem;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    var succeed;
	var currentFocus = document.activeElement;
	
    try{
    	succeed = document.execCommand("copy");
    }catch(e){
        succeed = false;
    }
	
    if(currentFocus && typeof currentFocus.focus === "function"){
        currentFocus.focus();
    }
    
    target.textContent = "";
    return succeed;
}