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
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  if (!isNaN(a) && !isNaN(b)) {
    res.status(200).json({ result: add(a, b) });
  } else {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (!isNaN(a) && !isNaN(b)) {
    res.status(200).json({ result: subtract(a, b) });
  } else {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) && Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.status(200).json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    return res.status(200).json({ result: divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    return res.status(200).json({ result: remainder(a, b) });
  }
});

module.exports = app;
