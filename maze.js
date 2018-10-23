

var canvas = $('#GameBoardCanvas');
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];
var player = {
    x: 0,
    y: 0
};

//Draw the game board
function draw(){
    var width = canvas.width();
    var blockSize = width/board.length;
    var ctx = canvas[0].getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    //Draw the player
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "blue";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

$(document).keyup(function(e){
    if((e.which == 38) && canMove(player.x, player.y-1))//Up arrow
        player.y--;
    else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
        player.y++;
    else if((e.which == 37) && canMove(player.x-1, player.y))
        player.x--;
    else if((e.which == 39) && canMove(player.x+1, player.y))
        player.x++;
    draw();
    e.preventDefault();
});

// Wrie a function that randomly prompts the user to answer a question. If he gtes it write then
// add 5 seconds to timer and if he gets it wrong then don't add time. Also You should keep track of stirkes. 3 strikes and you lose
function askQuestion() {
        
    // Loop through questionArray to see  if all questions are null:
    // If they are all null then don't do anything. If not then ask questions every 2 seconds.
    var mazeQuestions = [];
    var mazeAnswers = [];
    var indexArray = [];
    var qCount = 0
        for ( var i =0; i < questionArray.length;i++ ) {
            var question = questionArray[i]; 
            var answer = answerArray[i];  
            if(question != null) {
                // add to
                indexArray.push(i); 
                qCount++;
                mazeQuestions.push(question);
                mazeAnswers.push(answer);
            }
        }
    if (qCount != 0) { // Questions were provided
    // Pick a random number between 0 and length of questionArray and call it var qIndex. Prompt user with var answer = prompt(questionArray[qIndex] and then check if answer == answerArray[qIndex]. If so then add 2 seconds to timer
        var randomQ = Math.floor(Math.random()*(qCount));
        var answer = prompt(mazeQuestions[randomQ]);
        var index = indexArray[randomQ];
        if(answer == mazeAnswers[randomQ]) { // answered correctly
            // subtract 1 second from time
            timeToSubtract += 2;   
        }
        else {
            // Update Strikes
            strikeCount += 1;
            if (strikeCount == 3) {
                alert("Three strikes and you're out! Better Luck Next Time!");
                $('*').hide();
            }
        }
        // remove randomQ from questionArray and answerArray
        questionArray.splice(index, 1);
        answerArray.splice(index, 1);
         
    }
}


