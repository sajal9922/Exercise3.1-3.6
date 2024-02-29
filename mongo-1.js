const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
// console.log(password);

const url = `mongodb+srv://fullstack:${password}@cluster-demo.7tbn5u1.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster-demo`;
// const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// });

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });
const notesToAdd = [
  { content: 'HTML is Easy', important: true },
  { content: 'CSS is Stylish', important: true },
  { content: 'JavaScript is Powerful', important: true },
];

// Save each note in the database
// Note.insertMany(notesToAdd)
//   .then((result) => {
//     console.log(`${result.length} notes saved!`);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error('Error saving notes:', error);
//     mongoose.connection.close();
//   });
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
