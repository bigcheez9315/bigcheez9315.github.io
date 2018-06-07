
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
var buttonIndex;
var buttonID;
var numberPattern = /\d+/g;
/* 
For each button of class "questionButton", add a click function that first
checks the id to see what the suffix of the button is (eg. button0 has prefix 0).
This will be the index of the button.
We then have a form pop up that asks for the question and answer, providing examples.
Once the user inputs the question and answer, their response gets sent to the questionArray
and answerArray in the corresponding index.We can will then later be able to retrieve these 
responses using the same indexing system
*/


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
    // open popup window ot ask question and answer
    
    var categoryID = 'category' + ((buttonIndex % 6) + 1);
    var category = $('#' + categoryID).html();
    $('#customText').text(category + " for $" + $(this).val());


 //   $('.questionButton').hide();
 //   $("#form1").show();

    $("#form1").css("display","block");
// add a function that adds the quesiton and answers to the correct spot when save is entered 
// in form pop-up box



})

$("#form1").submit(function(e) {
    e.preventDefault();
});

// run printArray() function when print array button is clicked
$('#testArray').click(function(event) {
    for (var i=0; i<questionArray.length; i++) {
        document.write("question " + questionArray[i] + "; answer:  " + answerArray[i]+ "<br />");
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
    $('#form1').hide();


}




