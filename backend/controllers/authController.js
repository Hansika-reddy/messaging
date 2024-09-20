const db = require('./db'); // Adjust the path as necessary

// Registration endpoint
exports.register = async (req, res) => {
  const { name, phone, email, username, password } = req.body;

  try {
    // Check if the email or username already exists
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    // Insert new user
    await db.query('INSERT INTO users (name, phone, email, username, password) VALUES (?, ?, ?, ?, ?)', [name, phone, email, username, password]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
