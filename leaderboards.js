
    if (gamdemode === 'Weekend League') { 

    $("#calanderweek").datepicker({
                    
            onSelect: function (dateText, inst) {

                var selectedData = document.getElementById('calanderweek').value;
                
                var gameYear = selectedData.slice(6);
                
                var gameWeek = ($.datepicker.iso8601Week(new Date(dateText)));
                
                var gameWeekString = gameWeek.toString();
                
                var countmonth = gameWeekString.length;
                
                
                if (gameWeekString.length != 2) {
                    gameWeek = '0' + gameWeek;
                } 
                
                                console.log(gameWeek);

                
                var selectedCW = gameYear + '-' + gameWeek;
                            
                submitWeek(selectedCW)
                
            }
        
        }); 

    function submitWeek(selectedCW) { 
                
         var selectcw = selectedCW;
        
         selectedcw = selectcw.replace('W', '');
                
        
        if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("cw", selectedcw);
            window.location.search = searchParams.toString();
        }
        

        }    
    

        // grabs data from calander week from URL.
    
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const week = urlParams.get('cw')
            
        // checks if a calander week is set and defines the api url.
    
        if (week) {
            	   var api_ten = "https://europe-west3-rawbet-eu.cloudfunctions.net/getPastFutLeaderboard/"+week;

            var numbWeek = week.slice(5);
            
            document.getElementById("week-number").innerHTML = "Week " + numbWeek;

        }
    
        // if calander week is empty return default api url. 
    
        else {
            	   var api_ten = "https://europe-west3-rawbet-eu.cloudfunctions.net/getCurrentFutLeaderboard";
                        
        }
    
	/*	You have to pass some values to the script, if you want to load the current leaderboard or the past leaderboard. And if you load a past leaderboard, 
	you need some kind of Dropdown menu or anything else to differentiate which past leaderboard you want to load. So you need 3 values:
        
	1. identifier if you want to load current or past leaderboard
	2. calanderweek of the leaderboard
	3. year of the leaderboard

	And then do something like this: 

	if (currentLeaderboard) {
		var api_ten = https://europe-west3-rawbet-eu.cloudfunctions.net/getCurrentFutLeaderboard
	}
	else {
		var api_ten = https://europe-west3-rawbet-eu.cloudfunctions.net/getPastFutLeaderboard/YEAR-CW		for example https://europe-west3-rawbet-eu.cloudfunctions.net/getPastFutLeaderboard/2020-48
	}
	*/
      
	fetch(api_ten)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);

		})

		
	       function appendData(data) {
                                                         
                var maxPlayersInLeaderboard = data.length;
                   
                   if (data.length > 0) {
                   
    
		var positionDiv = document.getElementById("rank");
		var priceDiv = document.getElementById("price");	
		var nameDiv = document.getElementById("name");
		var winsDiv = document.getElementById("wins");
		var goalDifferenceDiv = document.getElementById("goalDifference");
		var gamesplayedDiv = document.getElementById("gamesplayed");
    var pointsDiv = document.getElementById("points");
    var picDiv = document.getElementById("displayPic");
		// var pointsDiv = document.getElementById("points");
		// var liveDiv = document.getElementById("live");
		
		// rank
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
			var div = document.createElement("li");			
			if (player == 0) { 			
				div.className = 'ranking_first';				 
			} 					
			else if (player == 1) { 						 
				div.className = 'ranking_second';						 
			}					
			else if (player == 2) { 						 
				div.className = 'ranking_third';					 
			}
			else { 						 
				div.className = 'ranking_default';			 
			}		
			div.innerHTML = player + 1;
			positionDiv.appendChild(div);
		}
		
		// price

                             
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {

                    try { 
                        if (data[player].price.en === undefined) {
                            
                            var div = document.createElement("li");
                            div.innerHTML = '0€';
                            priceDiv.appendChild(div);
                            
                        } else { 
			var div = document.createElement("li");
			div.innerHTML = data[player].price.en;
			priceDiv.appendChild(div);
                            
                        }
      }        
                    catch(err) {
                        
                    }
		} 
    



		// name
                   
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
                    
                    try { 
                        
			var div = document.createElement("li");
                        
			div.innerHTML = data[player].displayname;
                        
			nameDiv.appendChild(div);
                        
                    }
                    
                    catch(err) {
                        
                    }
                    
		}
    
		// wins
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
        try { 
			var div = document.createElement("li");
			div.innerHTML = data[player].wins;
			winsDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}

		// goalDifference
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try { 
			var div = document.createElement("li");
			div.innerHTML = data[player].goaldifference;
			goalDifferenceDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}

		// points
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try  { 

			var div = document.createElement("li");
			div.innerHTML = data[player].points;
			pointsDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}		
    
    
    
    		// display pic
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try  { 

			var div = document.createElement("li");
			div.innerHTML = '<img src="' + data[player].photoURL + '" style="width:25px;height:25px;border-radius: 100px"/>';;
			picDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}		
    
    
    https://static-cdn.jtvnw.net/jtv_user_pictures/7ef97325-ec4b-4871-bd2f-90abda02ad18-profile_image-300x300.png
                   
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try  { 

			var div = document.createElement("li");
			div.innerHTML = data[player].gamesplayed;
			gamesplayedDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}	
                   
                // Amount of points
                   /*
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
			var div = document.createElement("li");
			div.innerHTML = data[player].points;
			pointsDiv.appendChild(div);
		}	*/
				
		/*for (var player = 0; player < 10; player++) {
			var div = document.createElement("li");
			div.innerHTML = '<a class="watch" href="https://rawbetapp.com/live?u=' + data[i].topTen[player].name + '">Watch</a>';
			liveDiv.appendChild(div);
		}*/  
                       
              document.getElementById('lbLoading').style.display = 'none';
                   
  } else {
      
      document.getElementById('lbOffline').style.display = 'block';
      document.getElementById('lbLoading').style.display = 'none';
      
  } 
                   
               }

        
        
        
    }
    
    else {




        $("#calanderweek").datepicker({
                    
            onSelect: function (dateText, inst) {

                var selectedData = document.getElementById('calanderweek').value;
                
                var gameYear = selectedData.slice(6);
                
                var gameWeek = ($.datepicker.iso8601Week(new Date(dateText)));
                
                var gameWeekString = gameWeek.toString();
                
                var countmonth = gameWeekString.length;
                
                
                if (gameWeekString.length != 2) {
                    gameWeek = '0' + gameWeek;
                } 
                
                                console.log(gameWeek);

                
                var selectedCW = gameYear + '-' + gameWeek;
                
                console.log(selectedCW);
            
                submitWeek(selectedCW)
                
            }
        
        }); 

    function submitWeek(selectedCW) { 
                
         var selectcw = selectedCW;
        
         selectedcw = selectcw.replace('W', '');
                
        
        if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("cw", selectedcw);
            window.location.search = searchParams.toString();
        }
        

        }    
    

        // grabs data from calander week from URL.
    
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const week = urlParams.get('cw')
        
        console.log(week);
    
        // checks if a calander week is set and defines the api url.
    
        if (week) {
            
	   var api_ten = "https://europe-west3-rawbet-eu.cloudfunctions.net/getPastDivisionLeaderboard/"+week;
            
            console.log(api_ten); 
            
            var numbWeek = week.slice(5);
            
            document.getElementById("week-number").innerHTML = "Week " + numbWeek;

        }
    
        // if calander week is empty return default api url. 
    
        else {
            
	   var api_ten = "https://europe-west3-rawbet-eu.cloudfunctions.net/getCurrentDivisionLeaderboard";
            
            console.log(api_ten); 
            
        }
    
	/*	You have to pass some values to the script, if you want to load the current leaderboard or the past leaderboard. And if you load a past leaderboard, 
	you need some kind of Dropdown menu or anything else to differentiate which past leaderboard you want to load. So you need 3 values:
        
	1. identifier if you want to load current or past leaderboard
	2. calanderweek of the leaderboard
	3. year of the leaderboard

	And then do something like this: 

	if (currentLeaderboard) {
		var api_ten = https://europe-west3-rawbet-eu.cloudfunctions.net/getCurrentFutLeaderboard
	}
	else {
		var api_ten = https://europe-west3-rawbet-eu.cloudfunctions.net/getPastFutLeaderboard/YEAR-CW		for example https://europe-west3-rawbet-eu.cloudfunctions.net/getPastFutLeaderboard/2020-48
	}
	*/
      
	fetch(api_ten)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);

		})

		
	       function appendData(data) {
                                                         
                var maxPlayersInLeaderboard = data.length;
                   
                   if (data.length > 0) {
                   
    
		var positionDiv = document.getElementById("rank");
		var priceDiv = document.getElementById("price");	
		var nameDiv = document.getElementById("name");
		var winsDiv = document.getElementById("wins");
		var goalDifferenceDiv = document.getElementById("goalDifference");
		var gamesplayedDiv = document.getElementById("gamesplayed");
                var pointsDiv = document.getElementById("points");
		// var pointsDiv = document.getElementById("points");
		// var liveDiv = document.getElementById("live");
		
		// rank
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
			var div = document.createElement("li");			
			if (player == 0) { 			
				div.className = 'ranking_first';				 
			} 					
			else if (player == 1) { 						 
				div.className = 'ranking_second';						 
			}					
			else if (player == 2) { 						 
				div.className = 'ranking_third';					 
			}
			else { 						 
				div.className = 'ranking_default';			 
			}		
			div.innerHTML = player + 1;
			positionDiv.appendChild(div);
		}
		
		// price
   
                                      
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
        console.log(data[player].price.en);
      try { 
    if (data[player].price.en != null) {
			var div = document.createElement("li");
			div.innerHTML = data[player].price.en;
			priceDiv.appendChild(div);
      }
		}             catch(err) {
                        
                    }
                    
    }
    
   


		// name
                   
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
                    
                    try { 
                        
			var div = document.createElement("li");
                        
			div.innerHTML = data[player].displayname;
                        
			nameDiv.appendChild(div);
                        
                    }
                    
                    catch(err) {
                        
                    }
                    
		}
    
		// wins
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
        try { 
			var div = document.createElement("li");
			div.innerHTML = data[player].wins;
			winsDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}

		// goalDifference
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try { 
			var div = document.createElement("li");
			div.innerHTML = data[player].goaldifference;
			goalDifferenceDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}

		// points
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try  { 

			var div = document.createElement("li");
			div.innerHTML = data[player].points;
			pointsDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}		
                   
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
            try  { 

			var div = document.createElement("li");
			div.innerHTML = data[player].gamesplayed;
			gamesplayedDiv.appendChild(div);
      }         catch(err) {
                        
                    }
		}	
                   
                // Amount of points
                   /*
		for (var player = 0; player < maxPlayersInLeaderboard; player++) {
			var div = document.createElement("li");
			div.innerHTML = data[player].points;
			pointsDiv.appendChild(div);
		}	*/
				
		/*for (var player = 0; player < 10; player++) {
			var div = document.createElement("li");
			div.innerHTML = '<a class="watch" href="https://rawbetapp.com/live?u=' + data[i].topTen[player].name + '">Watch</a>';
			liveDiv.appendChild(div);
		}*/  
                   
              document.getElementById('lbLoading').style.display = 'none';
                   
  } else {
      
      document.getElementById('lbOffline').style.display = 'block';
      document.getElementById('lbLoading').style.display = 'none';
      
  } 
                   
               }
        
    }
    
    
