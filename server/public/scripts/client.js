// added some notes that I'm not even sure make sense but that how I am interpreting
// things but I am still so confused about GET and POST for some reason
// relied HEAVILY on notes for this assignment
// emphasis on HEAVILY lol

$(document).ready(onReady);
let selectedOperator;
function onReady() {
   
  console.log("Jquery is loaded");
  getCalculations();
  $('#plus').on("click", function () {
    selectedOperator = "+";
  });

  $('#minus').on("click",function () {
    selectedOperator = "-";
  });

  $('#times').on("click",function () {
    selectedOperator = "*";
  });

  $('#divide').on("click", function () {
    selectedOperator = "/";
  });

  $("#equals").on("click", postEquation);
  $("#clear").on("click", clearList)

};
// GET/ retrieve the data that I want to add to the calculationsArray and has the appendDom
// info in it that loops through and adds objects to the calculationsArray and will 
// append to the DOM when the post calls it

function getCalculations() {
  $.ajax({
    method: "GET",
    url: "/calculations",
  })
    .then((response) => {
      appendDom(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function appendDom(data) {
  console.log(data);
  console.log("append dom is working");
  $("#list").empty();
  $("#total").empty();
  for (const calculation of data) {;
    $("#list").append(
      `<li>${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber} = ${calculation.result}</li>`
    );
  }
  if (data[data.length - 1] !== undefined) {
    console.log("hey idiot, am i working?");
    $("#total").append(data[data.length - 1].result);
  }
}

//POST to /calculations that will run the GET getCalculations and appendDom
function postEquation() {
    let firstNumber = $("#firstNumber").val();
    let secondNumber = $("#secondNumber").val();
    let operator = selectedOperator
    let result = "";
    
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: {firstNumber, secondNumber, operator, result },
  })
    .then(() => {
      getCalculations();
    })
    .catch((err) => {
      console.log(err);
    });
$("#firstNumber").val("");
$("#secondNumber").val("");
}
// POST to /clear which clears the calculationsArray and then runs the GET function getCalculations again
// which will rerun the appendDom and everything.
function clearList() {
    $.ajax({
      method: "POST",
      url: "/clear",
    })
      .then(() => {
        getCalculations();
      })
      .catch((err) => {
        console.log(err);
      });
  }