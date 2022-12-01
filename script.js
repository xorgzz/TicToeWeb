"use strict";

//document.getElementById("zero").innerHTML = "qwe"
const table = ["", "", "", "", "", "", "", "", ""];
var bingo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let rounds=0;
let end = false;

function reload() {
	window.location.reload(true)
}

function notTaken(num) {
	if(table[num] != "x" && table[num] != "o") {
		return true;
	}
	return false;
}

function ending(player) {
	end = true;
	document.getElementById("ending").innerHTML = player + " wins !!";
}

function numRand(range) {
	let num = Math.floor(Math.random()*range);
	return num;
}

function input(player, num) {
	if(player == "x") {
		table[num] = "x";
		document.getElementById(num).classList.add("x");
	}
	else if(player == "o") {
		table[num] = "o";
		document.getElementById(num).style["border"] = "solid black 5px";
		document.getElementById(num).style["border-radius"]	= "500px";
	}

	rounds++;
}

function look() {
	for(let i=0; i<9; i++) {
		if(notTaken(i)) {
			input("x", i);
			document.getElementById("ending").innerHTML = "t i e";
		}
	}
}

function win(player) {
	let trio;
	for(let i=0; i<8; i++) {
		trio = 0;
		for(let j=0; j<3; j++) {
			if(table[bingo[i][j]] == player){
				trio++;
			}
		}
		if(trio == 3) {
			return true;
		}
	}
	return false;
}

function fill(num) {
	if(rounds%2 == 0 && notTaken(num) && !end) {
		if(rounds == 8) {
			look();
		}
		input("x", num);
		if(win("x")) {
			ending("x");
		}
	}
	if(!end && rounds%2==1) {
		bot();
		if(win("o")) {
			ending("o");
		}
	}
}

function bot() {
	let num0;
	var angs = [0, 2, 6, 8];
	var corners = [[0, 8], [2, 6], [1, 3, 5, 7]];
	var frames = [[1, 3], [1, 5], [7, 3], [7, 5], [0, 2, 6, 8]];
	var range = [];
	if(notTaken(4) && rounds == 1){
		input("o", 4);
		return;
	}
	else if(rounds == 1) {
		let num = numRand(4);
		input("o", angs[num]);
		return;
	}
	
	if(rounds == 3) {
		for(let i=0; i<4; i++) {
			if( table[frames[i][0]] == "x" && table[frames[i][1]] == "x" && notTaken(frames[4][i]) ) {
				input("o", frames[4][i]);
				return;
			}
		}
	}
	if(rounds == 3) {
		for(let i=0; i<2; i++) {
			if( table[corners[i][0]] == "x" && table[corners[i][1]] == "x" ) {
				input("o", corners[2][numRand(4)]);
				return;
			}
		}
	}

	for(let i=0; i<8; i++) {
		if( table[bingo[i][0]] == "o" && table[bingo[i][1]] == "o" && notTaken(bingo[i][2]) ) {
			input("o", bingo[i][2]);
			return;
		}
		else if( table[bingo[i][0]] == "o" && table[bingo[i][2]] == "o" && notTaken(bingo[i][1]) ) {
			input("o", bingo[i][1]);
			return;
		}
		else if( table[bingo[i][1]] == "o" && table[bingo[i][2]] == "o" && notTaken(bingo[i][0]) ) {
			input("o", bingo[i][0]);
			return;
		}
	}

	for(let i=0; i<8; i++) {
		if( table[bingo[i][0]] == "x" && table[bingo[i][1]] == "x" && notTaken(bingo[i][2]) ) {
			input("o", bingo[i][2]);
			return;
		}
		else if( table[bingo[i][0]] == "x" && table[bingo[i][2]] == "x" && notTaken(bingo[i][1]) ) {
			input("o", bingo[i][1]);
			return;
		}
		else if( table[bingo[i][1]] == "x" && table[bingo[i][2]] == "x" && notTaken(bingo[i][0]) ) {
			input("o", bingo[i][0]);
			return;
		}
	}

	for(let i=0; i<8; i++) {
		console.log("range" + i);
		if( table[bingo[i][0]] == "o" && notTaken(bingo[i][1]) && notTaken(bingo[i][2]) ) {
			console.log("range");
			range = [1,2];

			while(true) {
				num0 = range[numRand(2)]
				if(notTaken(num0)) {
					break;
				}
			}

			input("o", bingo[i][num0]);
			return;
		}
		else if( table[bingo[i][1]] == "o" && notTaken(bingo[i][0]) && notTaken(bingo[i][2]) ) {
			console.log("range");
			range = [0,2];
			
			while(true) {
				num0 = range[numRand(2)]
				if(notTaken(num0)) {
					break;
				}
			}

			input("o", bingo[i][range[numRand(2)]]);
			return;
		}
		else if( table[bingo[i][2]] == "o" && notTaken(bingo[i][0]) && notTaken(bingo[i][1]) ) {
			console.log("range");
			range = [0,1];

			while(true) {
				num0 = range[numRand(2)]
				if(notTaken(num0)) {
					break;
				}
			}

			input("o", bingo[i][range[numRand(2)]]);
			return;
		}
	}


	let num = numRand(9);
	while(true) {
		num = numRand(9);
		if(notTaken(num)) {
			input("o", num);
			return;
		}
	}




}