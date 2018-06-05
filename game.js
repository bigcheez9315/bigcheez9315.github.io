
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


/* 
For each button of class "questionButton", add a click function that first
checks the id to see what the suffix of the button is (eg. button0 has prefix 0).
This will be the index of the button.
We then have a form pop up that asks for the question and answer, providing examples.
Once the user inputs the question and answer, their response gets sent to the questionArray
and answerArray in the corresponding index.We can will then later be able to retrieve these 
responses using the same indexing system
*/


// function to pull out last element in string. Will be used to get index of each button
// last string way
function getLastChar(str){
	if(str.length){
		return str[str.length-1]
	}
	return str;
}

// Write click function for button. Should ask user to input question and answer and save
// responses in corresponding index in questionArray and answerArray
$(".questionButton").click(function(event) {
    var buttonID = $(this).attr('id');
    var buttonIndex = parseInt(buttonID[buttonID.length-1]); // find index and convert to number
    // open popup window ot ask question and answer
        
    var categoryID = 'category' + ((buttonIndex % 6) + 1);
    var category = $('#' + categoryID).html();
    $('#customText').text(category + "for $" + $(this).val());


 //   $('.questionButton').hide();
 //   $("#form1").show();

    $("#form1").css("display","block");
// add a function that adds the quesiton and answers to the correct spot when save is entered 
// in form pop-up box



})

















