const express = require('express');

const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement,
} = require('./lib/arrays');

const app = express();

app.use(express.json());

app.get('/strings/hello/:string', (req, res) => {
  return res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  return res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  return res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { length } = req.query;
  const { string } = req.params;
  if (length) {
    return res.status(200).json({ result: firstCharacters(string, length) });
  } else {
    return res.status(200).json({ result: firstCharacter(string) });
  }
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (!isNaN(a) && !isNaN(b)) {
    return res.status(200).json({ result: add(a, b) });
  } else {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
});

app.get('/numbers/subtract/:b/from/:a', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (!Number.isNaN(a) && !Number.isNaN(b)) {
    return res.status(200).json({ result: subtract(a, b) });
  } else {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) && Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    return res.status(200).json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) && Number.isNaN(b)) {
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
  } else if (Number.isNaN(a) && Number.isNaN(b)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    return res.status(200).json({ result: remainder(a, b) });
  }
});

app.post('/booleans/negate', (req, res) => {
  return res.status(200).json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  return res.status(200).json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:a', (req, res) => {
  const a = parseInt(req.params.a);

  if (Number.isNaN(a)) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  } else {
    return res.status(200).json({ result: isOdd(a) });
  }
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string, character } = req.params;

  if (character.length > 1) {
    return res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  } else {
    return res.status(200).json({ result: startsWith(character, string) });
  }
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const index = req.params.index;
  const array = req.body.array;

  return res.status(200).json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  return res.status(200).json({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  const { array, value } = req.body;

  return res.status(200).json({ result: addToArray2(value, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  return res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { array } = req.body;
  const { index } = req.query;

  return res.status(200).json({ result: removeNthElement(index, array) });
});

module.exports = app;
