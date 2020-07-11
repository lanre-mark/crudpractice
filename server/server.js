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

app.use(express.json());

app.use('/api/user', require('./routes/user'));

app.post('/api/post', (req, res) => {
  console.log('post request received', req.body);
  return res.status(200).send('POST REQUEST RECEIVED');
});

app.put('/api/put', (req, res) => res.send('PUT ROUTE'));

app.delete('/api/delete', (req, res) => res.send('DELETE ROUTE'));

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
