$(document).ready(onReady);

function onReady() {
  console.log("Jquery is loaded");
  getCalculations();
  $("#equals").on("click", postEquation);
}

function postEquation() {
    let firstNumber = $("#firstNumber").val();
    let secondNumber = $("#secondNumber").val();
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: {firstNumber: firstNumber, secondNumber: secondNumber, operator: operator, result: result },
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
  for (const calculation of data) {
    $("#list").append(
      `<li>${calculation.firstNumber}${calculation.operator}${calculation.secondNumber}${calculation.result}</li>`
    );
  }
  if (data[data.length - 1] !== undefined) {
    console.log("hey idiot");
    $("#total").append(data[data.length - 1].result);
  }
}
