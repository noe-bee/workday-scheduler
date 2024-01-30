//code wrapped all in a function
$(function () {

  var saveButtonEl = $(".saveBtn");
  saveButtonEl.on("click", function (event) {
    //'this' refers to the saveButtonEl
    var timeId = $(this).parent().attr("id"); //stores the id value of the saveButtonEl
    var userInput = $(this).parent().find(".description").val(); //stores userInput of the parent element of the buttonEl
    localStorage.setItem(timeId, userInput); //sets time:task in local storage
  });
  //
  var divTimeBlockEl = $(".time-block");
  var divTimeId = []; //array for each time block id

  $(divTimeBlockEl).each(function () {
    //this function changes the color of each time block
    var id = $(this).prop("id"); //grab id of each divTimeBlockEl
    divTimeId.push(id); //push it into the array divTimeId
    var currentHour = dayjs().format("H"); //current hour
    var parsedCurrentHour = parseInt(currentHour);
    
    for (i = 0; i < divTimeId.length; i++) { //iterate through each block...
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
  var textAreaEl = $("textarea");
  textAreaEl.each(function () { //this function retrieves all local storage and displays the 'taskdata'
    var textAreaId = $(this).parent().attr("id"); //id of each parent element of <textarea>
    var taskData = localStorage.getItem(textAreaId); //store the retrieved l.s from each block with an id
    $(this).val(taskData); //use .val() instead for <textarea> ... displays text
  });
  //
  var timeDisplayEl = $("#currentDay");
  function displayTime() {
    //this function displays time on the header page
    var currentDate = dayjs().format("MMMM DD, YYYY [at] hh:mm:ss a");
    timeDisplayEl.text(currentDate);
  }
  displayTime();

});
