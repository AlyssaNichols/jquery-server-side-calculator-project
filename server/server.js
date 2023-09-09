const express = require("express");
const app = express();
const PORT = 5000;

let calculationsArray = [];

// This must be added before GET & POST routes.
app.use(express.urlencoded({ extended: true }));


// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));



// GET is the first thing to do
app.get("/calculations", (req, res) => {
    console.log("GET request /calculations");
    res.send(calculationsArray);
})

app.post("/calculations", (req, res) => {
    console.log("POST request /calculations");
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
          }

    calculationsArray.push(calcHistory);
    res.sendStatus(201);
});

app.post("/clear", (req, res) => {
    console.log("Post request for /clear");
    calculationsArray = [];
    res.sendStatus(201);
  });



// MUST BE ON BOTTOM OF PAGE
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });