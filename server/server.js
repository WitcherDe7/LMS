const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();



app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user with email already exists
    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send({'message': 'Server error'});
            } else if (results.length > 0) {
                res.status(409).send({'message': 'User with email already exists'});
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                db.query(
                    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                    [name, email, hashedPassword],
                    (error, results) => {
                        if (error) {
                            console.error(error);
                            res.status(500).send({'message': 'Server error'});
                        } else {
                            res.status(200).send({'message': 'User registered successfully'});
                        }
                    }
                );
            }
        }
    );
});


// User login
app.post('/api/login', async (req, res) => {
    
    const { email, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send();
            } else if (results.length === 0) {
                res.status(401).send();
            } else {
                const user = results[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key');
                    res.status(200).send({ token });
                    // const userEmail = user.email;
                    // res.send({userEmail});
                    // res.status(200).send();
                } else {
                    res.status(401).send();
                }
            }
        }
    );
});

// Define a route to retrieve user data
app.get('/api/user', verifyToken, (req, res) => {
    // Get user data from a database
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      // Add other user data as needed
    };
  
    res.json(user);
  });
  

// protected endpoint
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected endpoint accessed successfully' });
});

// token verification middleware
function verifyToken(req, res, next) {
    const token = req.headers['auth'];
    if (typeof token !== 'undefined') {
        jwt.verify(token, 'your_jwt_secret_key', (err, authData) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' });
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// start server
app.listen(8000, () => {
    console.log('Server started on port 8000');
});