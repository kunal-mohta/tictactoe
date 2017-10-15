//constructor for every tile object
function tile(row,col){
	this.row = row;
	this.col = col;
}

tiles = [[],[],[]];//array that stores all the tiles as objects

var crosstiles = [[],[],[]];//an array that will store values in form of 1 and 0, 1 meaning that tile is occupied by a cross 
							//and 0 meaning not, purpose of this is to help ai find out whether user is about to win or not

var zerotiles = [[],[],[]];//an array that will store values in form of 1 and 0, 1 meaning that tile is occupied by a zero 
							//and 0 meaning not, purpose of this is to help ai find where to make a move to win						
//all tiles creates as objects
var k = -1;
for(i=1;i<=3;i++){
	for(j=1;j<=3;j++){
		k++;
		tiles[i-1][j-1] = new tile(i,j);
		tiles[i-1][j-1].element = document.getElementsByTagName("td")[k];
	}
}
//check after every move if the game has been won or not
function checkwin(lastmove, msg){
	for(i=1;i<=3;i++){
		for(j=1;j<=3;j++){
			if(lastmove == tiles[i-1][j-1].element){
				var l = i, m = j;
				break;
			}
		}
	}
	//current element is tiles[l-1][m-1].element;

	currentid = lastmove.id;

	//complete row
	for(k=0;k<3;k++){
			if(tiles[l-1][k].element.id != currentid){
				break;
			}

		if(k == 2){			
			setTimeout(function(){
				alert(msg);
				location.reload();
			}, 500);
		}
	}

	//complete column
	for(k=0;k<3;k++){
			if(tiles[k][m-1].element.id != currentid){
				break;
			}

		if(k == 2){
			setTimeout(function(){
				alert(msg);
				location.reload();
			}, 500);
		}
	}


	//complete diagonal
	if(tiles[0][0].element.id == currentid && tiles[1][1].element.id == currentid && tiles[2][2].element.id == currentid){
		setTimeout(function(){
			alert(msg);
			location.reload();
		}, 500);
	}
	if(tiles[0][2].element.id == currentid && tiles[1][1].element.id == currentid && tiles[2][0].element.id == currentid){
		setTimeout(function(){
			alert(msg);
			location.reload();
		}, 500);
	}

	
}

var move;
function game(){
	move = function(activetile){

		//check whether current tile is filled or not and subsequently fill it
		if(activetile.id != "cross" && activetile.id != "zero"){
			activetile.id = "cross";
			activetile.style.background = "url(icons/cross.svg) no-repeat";
			checkwin(activetile, "You won");
		}
		else{return false;}

		//updating the crosstiles array
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				if(tiles[i][j].element.id == "cross"){
					crosstiles[i][j] = 1;
				}
				else{
					crosstiles[i][j] = 0;
				}
			}
		}

		//AI's move; separated by a new block
		{

			outerloop: for(i=0;i<1;i++){
				//ai winning move
					//checks rowwise
					var count = 0;
					for(i=0;i<3;i++){
						for(j=0;j<3;j++){
							if(zerotiles[i][j] == 1){
								count++;
							}
							if(tiles[i][j].element.id == "cross"){
								count--;
							}
						}
						if(count == 2){
							for(k=0;k<3;k++){
								if(zerotiles[i][k] == 0){
									tiles[i][k].element.id = "zero";
									tiles[i][k].element.style.background = 'url(icons/zero.svg) no-repeat';
									checkwin(tiles[i][k].element, "You lost");
								break outerloop;
								}
							}
						}
						count = 0;
					}
				
				

				
					//checks columnwise
					count = 0;
					for(i=0;i<3;i++){
						for(j=0;j<3;j++){
							if(zerotiles[j][i] == 1){
								count++;
							}
							if(tiles[j][i].element.id == "cross"){
								count--;
							}
						}
						if(count == 2){
							for(k=0;k<3;k++){
								if(zerotiles[k][i] == 0){
									tiles[k][i].element.id = "zero";
									tiles[k][i].element.style.background = 'url(icons/zero.svg) no-repeat';
									checkwin(tiles[k][i].element, "You lost");
								}
							}
							break outerloop;
						}
						count = 0;
					}
				

				
					//checks diagonal1
					count = 0;
					for(i=0;i<3;i++){
						if(zerotiles[i][i] == 1){
							count++;
						}
						if(tiles[i][i].element.id == "cross"){
								count--;
							}
					}
					if(count == 2){
						for(k=0;k<3;k++){
							if(zerotiles[k][k] == 0){
								tiles[k][k].element.id = "zero";
								tiles[k][k].element.style.background = 'url(icons/zero.svg) no-repeat';
								checkwin(tiles[k][k].element, "You lost");
							}
						}
						break outerloop;
					}
					count = 0;
				

				
					//checks diagonal2
					count = 0;
					for(i=0,j=2;i<3,j>=0;i++,j--){
						if(zerotiles[i][j] == 1){
							count++;
						}
						if(tiles[i][j].element.id == "cross"){
								count--;
							}
					}
					if(count == 2){
						var m = 0;
						for(k=2;k>=0;k--){
							console.log(k+","+m);
							if(crosstiles[m][k] == 0){
								tiles[m][k].element.id = "zero";
								tiles[m][k].element.style.background = 'url(icons/zero.svg) no-repeat';
								checkwin(tiles[m][k].element, "You lost");
							}
							m++;
						}
						break outerloop;
					}
					count = 0;

				//preventing user from winning
					//checks rowwise
					var count = 0;
					for(i=0;i<3;i++){
						for(j=0;j<3;j++){
							if(crosstiles[i][j] == 1){
								count++;
							}
							if(tiles[i][j].element.id == "zero"){
								count--;
							}
						}
						if(count == 2){
							for(k=0;k<3;k++){
								if(crosstiles[i][k] == 0){
									tiles[i][k].element.id = "zero";
									tiles[i][k].element.style.background = 'url(icons/zero.svg) no-repeat';
									checkwin(tiles[i][k].element, "You lost");
								break outerloop;
								}
							}
						}
						count = 0;
					}
				
				

				
					//checks columnwise
					count = 0;
					for(i=0;i<3;i++){
						for(j=0;j<3;j++){
							if(crosstiles[j][i] == 1){
								count++;
							}
							if(tiles[j][i].element.id == "zero"){
								count--;
							}
						}
						if(count == 2){
							for(k=0;k<3;k++){
								if(crosstiles[k][i] == 0){
									tiles[k][i].element.id = "zero";
									tiles[k][i].element.style.background = 'url(icons/zero.svg) no-repeat';
									checkwin(tiles[k][i].element, "You lost");
								}
							}
							break outerloop;
						}
						count = 0;
					}
				

				
					//checks diagonal1
					count = 0;
					for(i=0;i<3;i++){
						if(crosstiles[i][i] == 1){
							count++;
						}
						if(tiles[i][i].element.id == "zero"){
								count--;
							}
					}
					if(count == 2){
						for(k=0;k<3;k++){
							if(crosstiles[k][k] == 0){
								tiles[k][k].element.id = "zero";
								tiles[k][k].element.style.background = 'url(icons/zero.svg) no-repeat';
								checkwin(tiles[k][k].element, "You lost");
							}
						}
						break outerloop;
					}
					count = 0;
				

				
					//checks diagonal2
					count = 0;
					for(i=0,j=2;i<3,j>=0;i++,j--){
						if(crosstiles[i][j] == 1){
							count++;
						}
						if(tiles[i][j].element.id == "zero"){
								count--;
							}
					}
					if(count == 2){
						var k = 0;
						for(m=2;m>=0;m--){
							console.log(k+","+m);
							if(crosstiles[k][m] == 0){
								tiles[k][m].element.id = "zero";
								tiles[k][m].element.style.background = 'url(icons/zero.svg) no-repeat';
								checkwin(tiles[k][m].element, "You lost");
							}
							k++;
						}
						break outerloop;
					}
					count = 0;	
				
				//random move
					var emptytiles = [];

					for(i=0;i<3;i++){
						for(j=0;j<3;j++){
							if(tiles[i][j].element.id != "cross" && tiles[i][j].element.id != "zero"){
								emptytiles[emptytiles.length] = tiles[i][j];
							}
						}
					}
					if(emptytiles.length == 0){
						setTimeout(function(){alert("Tie!");
						location.reload();	
					}, 1)
					}
					var random;
					function findrand(){
						random = Math.round(Math.random()*10);
						if(random >= emptytiles.length){
							findrand();
						}
					}
					findrand();

					emptytiles[random].element.id = "zero";
					emptytiles[random].element.style.background = 'url(icons/zero.svg) no-repeat';
			}

		}
		//updating the zerotiles array
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				if(tiles[i][j].element.id == "zero"){
					zerotiles[i][j] = 1;
				}
				else{
					zerotiles[i][j] = 0;
				}
			}
		}
	}
}

game();

