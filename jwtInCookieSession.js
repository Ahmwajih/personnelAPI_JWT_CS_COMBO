const express = require('express');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');

const app = express();

// Set up the cookie-session middleware
app.use(cookieSession({
    name: 'session',
    keys: ['yourSecretKey'], // replace with your own secret key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Example secret key for signing the JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Route to generate and store the JWT in a cookie
app.get('/login', (req, res) => {
    // Example payload for the JWT
    const payload = {
        userId: '66b28401ffadc6c94601d051',
        isAdmin: true
    };

    // Sign the JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Store the JWT in the cookie session
    req.session.jwt = token;

    res.send('JWT has been stored in a cookie!');
});

// Route to verify and retrieve the JWT from the cookie
app.get('/protected', (req, res) => {
    const token = req.session.jwt;

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        // Verify the JWT
        const decoded = jwt.verify(token, JWT_SECRET);
        res.send(`Welcome! Your user ID is: ${decoded.userId}`);
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});