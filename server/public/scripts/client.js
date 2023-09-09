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