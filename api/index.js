const express = require('express');
const {db} = require('./db/sql')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(cors());

app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1>`);
})

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM access_user', (err, result) => {
        if (err) {
            console.log('Error executing query: ', err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(result);
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})