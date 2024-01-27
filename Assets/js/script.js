// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var saveButtonEl = $(".saveBtn");

  saveButtonEl.on("click", function (event) {  //we are console logging the parent element's id of the button. 'this' signifies the saveButtonEl
    var timeId= $(this).parent().attr("id"); 
    // console.log(timeId) //outputs the hour of the block
    var userInput = $(this).parent().find('.description').val();
    // console.log(userInput); //outputs the user input
    localStorage.setItem(timeId, userInput); //sets hour:task in local storage
  });

//
var divTimeBlockEl = $('.time-block');
var divTimeId = []; //array for each time block id

$(divTimeBlockEl).each(function () {
  //this function changes the color of each time block

  var id = $(this).prop("id");
  divTimeId.push(id);
  var currentHour = dayjs().format("H");
  var parsedCurrentHour = parseInt(currentHour);
  for (i = 0; i < divTimeId.length; i++) {
    var parsedDivTimeId = parseInt(divTimeId[i]);
    if (parsedDivTimeId === parsedCurrentHour) {
      $(this).addClass("present");
    } else if (parsedDivTimeId > parsedCurrentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("past");
    }
  }
});
//
  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?

  var taskData = localStorage.getItem('userInput') || {}; // uses the '||' or operator to tell jS to check if there's any data in localStorage and if not, return an empty object
  var stringData = JSON.stringify(taskData);
  // console.log(stringData)
  // console.log(taskData)
  // console.log(keyInLocalStorage);
  // var saveTaskData = localStorage.setItem("taskData", taskData);
  // TODO: Add code to display the current date in the header of the page.
  var timeDisplayEl = $('#currentDay')
  function displayTime() { //display time on header
    var currentDate = dayjs().format('MMMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(currentDate);
  }
  displayTime();
});
