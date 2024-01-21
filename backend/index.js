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

app.use(express.json())
app.use(cors())

// Custom middleware function
app.use('/transactions/:user_id', (req, res, next) => {
    const token = req.headers['token'];

    // Extract user_id from the URL parameter
    const user_id = req.params.user_id;

    console.log('Token:', token);
    console.log('User ID:', user_id);

    if (!token || !user_id) {
        res.status(401).send("Token or user_id missing");
        return;
    }

    next();
//     // Code to run at the start of every request
//     const token = req.headers['token'];
//     console.log(token)

//     // Extract user_id from the URL parameter
//     const user_id = req.params.user_id;

//     if (!token || !user_id) {
//         res.status(400).send("Token or user_id missing");
//         return;
//     }

//     const decodedToken = jwtDecode(token)

//     const q = "SELECT email FROM users WHERE user_id = ?"
//     const values = [req.params.user_id]
//     let userEmail = ""
//     db.query(q, values, (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(400).json(err);
//             return;
//         } else {
//             res.status(200).json(data);
//             userEmail = json(data);
//         }
//     });

//     if (decodedToken.email !== userEmail) {
//         return 403;
//     }
//     console.log("hehehehee")

//     // Continue to the next middleware in the stack

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
    // const token = req.headers['token'];

    // // Extract user_id from the URL parameter
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
app.delete('/transactions/:user_id', async (req, res) => {

    const q = "DELETE FROM transaction_history WHERE id= ? AND user_id = ?"
    console.log(q)
    const values = [req.body.id, req.params.user_id]
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