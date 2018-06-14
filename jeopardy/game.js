
// Make a function that changes title when it is clicked
$(".title").click(function(event) {
    var newTitle = prompt("Enter subject of Jeopardy study game");
    $(this).text(newTitle);

})

// Make a function that changes the category title when clicked
$(".category").click(function(event) {
    var newCategory = prompt("Enter Category");
    $(this).text(newCategory);
})


// global variables
// instantiate both the question and answer array
// The user will add questions and answers to the array when he clicks on their corresponding buttons
// button
var questionArray = [];
var answerArray = [];
var buttonArray = [];
var buttonIndex;
var buttonID;
var numberPattern = /\d+/g;
var totalScore = 0;
var isPlaying = false;
// hide the scoreboard
// $('.topright').hide();
/*
 
For each button of class "questionButton", add a click function that first
checks the id to see what the suffix of the button is (eg. button0 has prefix 0).
This will be the index of the button.
We then have a form pop up that asks for the question and answer, providing examples.
Once the user inputs the question and answer, their response gets sent to the questionArray
and answerArray in the corresponding index.We can will then later be able to retrieve these 
responses using the same indexing system
*/


//replace all calls to class questionButton to jquery selector of button (":button") with
// jquery (.filter(":contains(button)")
// should be : $("button").hasClass("button")

// write function to instantiate questionArray and answerArray
function instantiateArray(arr) {
    for (var i = 0; i < 30; i++) {
        arr.push(null);
    }
}
// check if questionArray and answerArray have been instantiated; if not then instantiate
if(questionArray.length == 0) {
    instantiateArray(questionArray);
    instantiateArray(answerArray);
}
// Write click function for button. Should ask user to input question and answer and save
// responses in corresponding index in questionArray and answerArray
$(".questionButton").click(function(event) {
    buttonID = $(this).attr('id');
    buttonIndex = parseInt(buttonID.match(numberPattern)); // find index and convert to number
    // If game hasn't started yet, open popup window ot ask question and answer
    if (isPlaying == false) {
        var categoryID = 'category' + ((buttonIndex % 6) + 1);
        var category = $('#' + categoryID).html();
        $('#customText').text(category + " for $" + $(this).val());
        buttonArray.push(buttonID);    
        

        $("#form1").css("display","block");
    }
    // If game has started and the user clicked a button that has a question and answer provided
    // then ask user the corresponding question when he clicks button
    else if(isPlaying == true & buttonArray.indexOf(buttonID) != -1 ) {
        var question = questionArray[buttonIndex];
        var answer = answerArray[buttonIndex];
        var response = prompt(question);
        if (response == answer) { // if user gets question correct
            totalScore += parseInt($('#'+buttonID).val());  
            buttonArray.splice(buttonIndex, 1); // remove the clicked button from button array
            $('#'+buttonID).css('color','black'); // change text in button back to back
            $('#'+buttonID).disabled = true;            
        }
        $('p').html('Score: $' + totalScore);
    }
// add a function that adds the quesiton and answers to the correct spot when save is entered 
// in form pop-up box



})
// Prevent the page from automatically refreshing when you hit submit
$("#form1").submit(function(e) {
    e.preventDefault();
});

/*
// run printArray() function when print array button is clicked
$('#testArray').click(function(event) {
    for (var i=0; i<questionArray.length; i++) {
        document.write("question " + questionArray[i] + "; answer:  " + answerArray[i]+ "<br />");
    }

})
*/

// This is what happens when user clicks 'play game' button
$('#play').click(function(event) {
    // loop through all buttons and see which have a question and answer( !=null)
    // find the index of those buttons by doing % on the suffix
    // loop through all category and money buttons and which ever ones aren't one of the 
    // winning numbers (the category numbers which have a button which has been clicked)
    // should be hidden.

    // If they click jeopardy then run jeopardy game
    if($('#gameOption').find(":selected").text() == 'Jeopardy') {
        $("td").hide();
        $('p').html("Score : $" + totalScore);
        isPlaying = true;
        // hide all of the buttons and then show the ones that are in the catArray and buttonArray
        $('.topright').show();

        // show the used columns 
        for(var i=0; i<buttonArray.length;i++) {
            var buttonID = buttonArray[i];
            
            var colNumber = (parseInt(buttonID.match(numberPattern)) % 6 +1)
            $('td:nth-child(' + colNumber + ')').show();
        }
    }
    // if they click maze then run the maze game
    else if ($('#gameOption').find(":selected").text() == 'Maze') {
        $("td, th").hide();
        $('canvas').show();
        draw();             
    }
}) 

// In the submit function, you need to retrieve the data from the question and answer text
// boxes and store them in the questionArray and answerArray in their corresponding locations
function onSubmitFn() {
    
    var question = $('input[name="question"]').val();
    var answer = $('input[name="answer"]').val();
    questionArray.splice(buttonIndex, 0, question); // add question into questionArray
    answerArray.splice(buttonIndex, 0, answer);
    $('#'+buttonID).css('color','yellow');
    // keep track of the column index
    $('#form1').hide();


}




