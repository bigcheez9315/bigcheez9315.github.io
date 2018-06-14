// Sourcde code taken from: http://rosettacode.org/wiki/Maze_generation#JavaScript



/* Maze generator:
Variable meanings in function maze:

x,y — dimensions of maze
n — number of openings to be generated
horiz — two dimensional array of locations of horizontal openings (true means wall is open)
verti — two dimensional array of locations of vertical openings (true means wall is open)
here — current location under consideration
path — history (stack) of locations that might need to be revisited
unvisited — two dimensional array of locations that have not been visited, padded to avoid need for boundary tests (true means location needs to be visited)
potential — locations adjacent to here
neighbors — unvisited locations adjacent to here
Variable meanings in function display:

m — maze to be drawn
text — lines of text representing maze
line — characters of current line
Note that this implementation relies on javascript arrays being treatable as infinite in size with false (null) values springing into existence as needed, to support referenced array locations. (This significantly reduces the bulk of the necessary initialization code.)
*/

function maze(x,y) {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}
	return {x: x, y: y, horiz: horiz, verti: verti};
}
 
function display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= '+';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= '-';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= '|';
				else
					line[k]= ' ';
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+'\r\n');
	}
	return text.join('');
}
//draw maze
document.getElementById('out').innerHTML= display(maze(15, 20)); 
i
