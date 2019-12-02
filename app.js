const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


app.get('/sum', (req, res) => {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let solution = a + b;
  if (!req.query.a || !req.query.b) {
    return res.status(400).send('Invalid request');
  }

  res.send(`The sum of ${req.query.a} + ${req.query.b} is ${solution}`);
});


app.get('/cipher', (req, res) => {
  console.log('test');
 let shift = parseInt(req.query.shift);

  let output = '';
  console.log(req.query.text);
  for (let i = 0; i < req.query.text.length; i++) {
    let initialNum = req.query.text.charCodeAt(i);
    let newNum = initialNum + shift;
    let newLetter = String.fromCharCode(newNum);
    output = output + newLetter;
  }
  res.send(`${output}`);
});


app.get('/lotto', (req, res) => {
  console.log(req.query.arr);
  if (req.query.arr.length > 6 || req.query.arr.length < 6 ) {
    res.send(`error: Please input 6 numbers!`);
  } 

  for (let i = 0; i <= 5; i++) {
    if (req.query.arr[i] > 20 || req.query.arr[i] < 1) {
      res.send(`error: Please enter numbers 1 - 20 only!`);
    }
  }
  
  let results = [];
  for(let i = 0; i <= 5; i++) {
  let randomNums = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  results.push(randomNums);
  }
  
  let counter = 0;
  for (let i = 0; i <=5; i++){
    if (results.includes(req.query.arr[i])) {
      counter ++;
    } 

    if (counter < 4){
      res.send(`Sorry, you lose.`)
    } else if (counter === 5) {
      res.send(`Congratulations! You win $100!`)
    } else {
      res.send(`Wow! Unbelievable! You could have won the mega millions!`)
    }
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});