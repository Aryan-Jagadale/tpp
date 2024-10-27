const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'ui/build')));

const SECRET_KEY = 'your-secret-key'; // In a real app, use an environment variable

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // In a real app, you would validate against a database
  if (email === 'user@example.com' && password === 'p') {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.email;
    next();
  });
};

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.userId });
});

// Serve login.html for the /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/public', 'login.html'));
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});