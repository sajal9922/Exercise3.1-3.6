const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
// Exercise 3.7
// Usingn Morgan middleware with 'tiny' formate
app.use(morgan('tiny'));

// Exercise 3.1

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

// Exercise 3.2

app.get('/info', (req, res) => {
  const personCount = persons.length;
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${personCount} people.<br/>${currentDate} </p>`
  );
});

// Exercise 3.3 Finding person by id

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (!person)
    return res.status(404).send('Person with given ID does not exist.');
  res.send(person);
});

// Exercise 3.4 Deleting person by id
app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (!person)
    return res.status(404).send('Person with given ID does not exist.');
  const index = persons.indexOf(person);
  persons.splice(index, 1);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  // Exercise 3.6 Validation
  if (!req.body.name || !req.body.number) {
    console.log('works');
    return res.status(400).send('Name and Number Both are required!');
  }
  const existingPerson = persons.find(
    (person) => person.name === req.body.name
  );
  if (existingPerson) return res.status(400).send('Person alredy exist!');

  // Exercise 3.5 Adding person to the server
  const newPerson = {
    id: generateRandomId(),
    name: req.body.name,
    number: req.body.number,
  };
  persons = persons.concat(newPerson);
  res.send(newPerson);
});
const generateRandomId = () => Math.floor(Math.random() * 1000000);
// const r = generateRandomId();
// console.log(r);

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
