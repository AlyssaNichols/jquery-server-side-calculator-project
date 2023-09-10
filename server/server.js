// added some notes that I'm not even sure make sense but that how I am interpreting
// things but I am still so confused about GET and POST for some reason
// relied HEAVILY on notes for this assignment
// emphasis on HEAVILY lol

const express = require("express");
const app = express();
const PORT = 5000;

let calculationsArray = [];

// This must be added before GET & POST routes.
app.use(express.urlencoded({ extended: true }));


// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));



// GET is the first thing to do
// gets the calculationsArray information on the server so that information can be added
// and "POSTED" and then shown on the DOM
app.get("/calculations", (req, res) => {
    console.log("GET request /calculations");
    res.send(calculationsArray);
})

// POST to /calculations
// this has the operations in it depending on which operator was clicked on the server side
// then it pushes that object into the calculationsArray to be posted in the DOM body
app.post("/calculations", (req, res) => {
    console.log("POST request /calculations");
    // tried to do required fields stretch goal but couldn't get it?
    const requiredFields = ["firstNumber", "secondNumber", "operator"]; 
    // for (const field of requiredFields) {
    //   if (!req.body[field]) {
    //     return res.status(400).json({ error: `Field '${field}' is missing.` });
    //   }
    // }
  
    console.log(calculationsArray);
    let calculation = req.body;
    //comparison
    let calcHistory = {
      firstNumber: Number(calculation.firstNumber),
      secondNumber: Number(calculation.secondNumber),
      operator: calculation.operator,
      result: Number(calculation.result),
    };
    switch (calcHistory.operator) {
        case "+":
          calcHistory.result = calcHistory.firstNumber + calcHistory.secondNumber;
          break;
        case "-":
            calcHistory.result = calcHistory.firstNumber - calcHistory.secondNumber;
            break;
        case "*":
            calcHistory.result = calcHistory.firstNumber * calcHistory.secondNumber;
            break;
        case "/":
            calcHistory.result = calcHistory.firstNumber / calcHistory.secondNumber;
          };
         

    calculationsArray.push(calcHistory);
    res.sendStatus(201);
});

// POST to /clear to clear out the calculationsArray so the history of equations that 
// have been run clears out
app.post("/clear", (req, res) => {
    console.log("Post request for /clear");
    calculationsArray = [];
    res.sendStatus(201);
  });



// MUST BE ON BOTTOM OF PAGE
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });