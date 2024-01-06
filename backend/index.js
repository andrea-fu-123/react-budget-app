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

app.use (express.json())
app.use (cors())

db.on('error', (err) => {
    console.error('MySQL Connection Error:', err);
});

app.get('/',(req, res) => {
    res.json('Connected to backend')
})
app.get('/transactions',(req, res) => {
    const token = req.headers['token'];
    if (!token) {
        res.status(400)
            return 
    }
    const decodedToken = jwtDecode(token) // here!
    
    const q = "SELECT * FROM transaction_history ORDER BY date DESC, amount ASC"
    db.query(q, (err, data) => {
        if (err) {
            console.error(err)
            res.status(400).json(err)
            return 
        } else {
            res.status(200).json(data)
        }
    })
   
})

app.post('/transactions', (req, res) => {
    const q = "INSERT INTO transaction_history (date, amount) VALUES (?,?)"
    const values = [req.body.date, req.body.amount]
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