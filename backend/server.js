const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Dummy user data for demonstration
const users = [
  { username: 'user1', password: 'password1' }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Messaging Service API!');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid username or password' });
  }
});

// Allow access to chat without login
app.get('/chat', (req, res) => {
  res.send({ message: 'Chat page content' });
});

// Start server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
