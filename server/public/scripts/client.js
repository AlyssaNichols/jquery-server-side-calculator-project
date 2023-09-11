// added some notes that I'm not even sure make sense but that how I am interpreting
// things but I am still so confused about GET and POST for some reason
// relied HEAVILY on notes for this assignment
// emphasis on HEAVILY lol

$(document).ready(onReady);
let selectedOperator;
function onReady() {
  console.log("Jquery is loaded");
  // run getCalculations
  getCalculations();
  // setting the selectedOperator variable value depending on which operator button was clicked
  // originally set a blank selectedOperator variable within function
  $("#plus").on("click", function () {
    selectedOperator = "+";
  });

  $("#minus").on("click", function () {
    selectedOperator = "-";
  });

  $("#times").on("click", function () {
    selectedOperator = "*";
  });

  $("#divide").on("click", function () {
    selectedOperator = "/";
  });
  $("#clearFields").on("click", clearFields);
  $("#equals").on("click", postEquation);
  $("#clear").on("click", clearList);
}
// GET/ retrieve the data that I want to add to the calculationsArray and has the appendDom
// info in it that loops through and adds objects to the calculationsArray and will
// append to the DOM when the post calls it

function clearFields() {
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
  // log the data (will be the response- the calculations array with the new equation in it)
  console.log(data);
  console.log("append dom is working");
  //empty the list and total so that it doesn't add the array multiple times when adding an equation
  $("#list").empty();
  $("#total").empty();
  // loop through an array parameter and append the data to the DOM
  for (const calculation of data) {
    $("#list").append(
      `<li>${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber} = ${calculation.result}</li>`
    );
  }
  // append the result of the last equation to the h2 with the id of total
  if (data[data.length - 1] !== undefined) {
    console.log("appending equation total to the DOM");
    $("#total").append(data[data.length - 1].result);
  }
}

//POST to /calculations that will run the GET getCalculations and appendDom
function postEquation() {
  let firstNumber = $("#firstNumber").val();
  let secondNumber = $("#secondNumber").val();
  let operator = selectedOperator;
  let result = "";

  // should require all fields, havent tested in my browser yet, did during liveshare
  // if (!firstNumber || !secondNumber || !operator){
  //   alert("Please fill in all of the fields and try again!")

  //   return;
  // };

  // POST the equation data and then run the getCalculations GET which
  // includes the appendDOM function
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: { firstNumber, secondNumber, operator, result },
  })
    .then(() => {
      getCalculations();
    })
    .catch((err) => {
      console.log(err);
    });
  // empty the input values
  clearFields();
}
// POST to /clear which clears the calculationsArray and then runs the GET function getCalculations again
// which will rerun the appendDom and everything.
// function clearList() {
//   $.ajax({
//     method: "POST",
//     url: "/clear",
//   })
//     .then(() => {
//       getCalculations();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// DELETE to /calculations to clear out the history
function clearList() {
  $.ajax({
    method: "DELETE",
    url: "/calculations",
  })
    .then(() => {
      console.log("DELETE request for /calc");
      getCalculations();
    })
    .catch((err) => {
      console.log(err);
    });
};