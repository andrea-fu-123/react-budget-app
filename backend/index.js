import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import { jwtDecode } from "jwt-decode";


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "mybudget",

})

app.use(express.json())
app.use(cors())

// Custom middleware function
app.use('/transactions/:user_id', (req, res, next) => {
    console.log("middleware called")
    const token = req.headers['token'];
    console.log("line 24:" + req.headers)

    // Extract user_id from the URL parameter
    const user_id = req.params.user_id;

    if (!token || !user_id) {
        console.log(user_id)
        console.log("missing token")
        res.status(401).send("Token or user_id missing");
        return;
    }

    const decodedToken = jwtDecode(token)

    const q = "SELECT email FROM users WHERE user_id = ?"
    const values = [req.params.user_id]
    console.log("line40")
    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).json({ error: 'SQL error'});
            return;
        } 

        if (data.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (data[0].email !== decodedToken.email) {
            res.status(403).json({ error: 'Not authorized' });
            return;
        }
        console.log("line57")
        next();

    });

});

db.on('error', (err) => {
    console.error('MySQL Connection Error:', err);
});

app.get('/', (req, res) => {
    res.json('Connected to backend')
})
app.post('/users', (req, res) => {
    const q = "INSERT INTO `users` (`user_id`, `email`) VALUES (?, ?)";
    const values = [req.body.user_id, req.body.email]
    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).json(err);
            return;
        } else {
            res.status(200).json(data);
        }
    });
});
app.get('/users', (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).json(err);
            return;
        } else {
            res.status(200).json(data);
        }
    });
});

app.get('/transactions/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const q = 'SELECT * FROM transaction_history WHERE user_id = ? ORDER BY date DESC, amount ASC';

    db.query(q, [user_id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(400).json(err);
            return;
        } else {
            res.status(200).json(data);
        }
    });
});


app.post('/transactions/:user_id', (req, res) => {

    // Extract user_id from the URL parameter
    console.log("POST called API")

    const q = "INSERT INTO transaction_history (date, amount, user_id) VALUES (?,?,?)"
    const values = [req.body.date, req.body.amount, req.params.user_id]
    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err)
            res.status(400).json(err)
            return
        } else {
            res.status(200).json(req.body)
        }
    })
})
app.delete('/transactions/:user_id', (req, res) => {
    console.log("DELETE called API")
    const q = "DELETE FROM transaction_history WHERE id= ? AND user_id = ?"
    console.log(q)
    const values = [req.headers['id'], req.params.user_id]
    
    console.log("id in api: " + values[0])
    db.query(q, values, (err, data) => {
        if (err) {
            res.status(400).json(err)
            return
        }
        else {
            res.status(200).json(req.body.id)
        }
    })
})

app.listen(8800, () => {
    console.log('connected to the backend!')
})

export default app