const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { length } = req.query;
  const { string } = req.params;
  if (length) {
    res.status(200).json({ result: firstCharacters(string, length) });
  } else {
    res.status(200).json({ result: firstCharacter(string) });
  }
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  res.status(200).json({ result: add(parseInt(req.params.a), parseInt(req.params.b)) });
});

module.exports = app;
