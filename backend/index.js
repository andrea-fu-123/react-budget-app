import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';


const app = express()



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "mybudget",

})

app.use (express.json())
app.use (cors())

db.on('error', (err) => {
    console.error('MySQL Connection Error:', err);
});

app.get('/',(req, res) => {
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
    const token = req.headers['token'];

    // Extract user_id from the URL parameter
    const user_id = req.params.user_id;

    if (!token || !user_id) {
        res.status(400).send("Token or user_id missing");
        return;
    }

    const decodedToken = jwtDecode(token); // decode for authorization

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
    const token = req.headers['token'];

    // Extract user_id from the URL parameter
    const user_id = req.params.user_id;

    if (!token || !user_id) {
        res.status(400).send("Token or user_id missing");
        return;
    }
    
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
app.delete('/transactions', async (req, res) => {
    const id = req.body.id;
    if (id === 0) {
        res.status(400).json('The ID to the transaction history table cannot be 0')
        return
    } else {
        const response = await fetch('http://localhost:8800/transactions')
        const transactions = await response.json()
        const idsArray = transactions.map(transaction => transaction.id);
        console.log(idsArray)
        
        const q = "DELETE FROM transaction_history WHERE id= ?"
        db.query(q, id, (err, data) => {
            if (err) {
                res.status(400).json(err)
                return 
            } else if (!idsArray.includes(id)) {
                res.status(400).json("ID does not exist")
                return 
            } else {
                res.status(200).json(req.body.id)
            }
        })
    }


})

app.listen(8800, () => {
    console.log('connected to the backend!')
})

export default app