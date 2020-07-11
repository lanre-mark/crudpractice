const express = require('express');
const path = require('path');

const app = express();

const connectDB = require('./db');

let PORT = 5001;

connectDB();

app.get('/', (req, res) => res.sendFile(path.resolve('../src', 'index.html')));
app.get('/index.js', (req, res) =>
  res.sendFile(path.resolve('../src', 'index.js'))
);
app.get('/main.js', (req, res) =>
  res.sendFile(path.resolve('../src', 'main.js'))
);
app.get('/error', (req, res) =>
  res.sendFile(path.resolve('../src', 'error.html'))
);
app.get('/error.js', (req, res) =>
  res.sendFile(path.resolve('../src', 'error.js'))
);
app.get('/main', (req, res) =>
  res.sendFile(path.resolve('../src', 'main.html'))
);

app.use(express.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/todo', require('./routes/todo'));

app.post('/api/post', (req, res) => {
  console.log('post request received', req.body);
  return res.status(200).send('POST REQUEST RECEIVED');
});

app.put('/api/put', (req, res) => res.send('PUT ROUTE'));

app.delete('/api/delete', (req, res) => res.send('DELETE ROUTE'));

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
