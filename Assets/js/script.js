// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var saveButtonEl = $(".saveBtn");

  saveButtonEl.on("click", function (event) {
    //'this' refers to the saveButtonEl
    var timeId= $(this).parent().attr("id"); //stores the id value of the saveButtonEl
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
  var taskData = localStorage.getItem("userInput") || {}; // uses the '||' or operator to tell jS to check if there's any data in localStorage and if not, return an empty object
  // taskData = JSON.parse(taskData);
  // console.log(taskData);
  //
  var textAreaEl = $("textarea");

  textAreaEl.each(function () {
    textAreaId = $(this).parent().attr('id') //id of each parent element of <textarea>
    // console.log(textAreaId)

    $(this).val(taskData); //use .val() instead 
  })

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?

  //
  var timeDisplayEl = $("#currentDay");
  function displayTime() {
    //this function displays time on the header page
    var currentDate = dayjs().format("MMMM DD, YYYY [at] hh:mm:ss a");
    timeDisplayEl.text(currentDate);
  }
  displayTime();
});
