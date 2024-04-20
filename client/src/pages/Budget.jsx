
import SpendingHistory from './SpendingHistory';
import Payments from './Payments';
import Summary from './Summary';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Button } from '@mui/material';
import 'reactjs-popup/dist/index.css';

const Budget = function () {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchUserId = async (token) => {
            try {
                const decodedToken = jwtDecode(token)
                const email = decodedToken.email
                const users = await axios.get("http://localhost:8800/users")
                const user = users.data.find(transaction => transaction.email === email);
                let user_id = -1
                console.log(email)
                if (user) {
                    user_id = user.user_id;
                    console.log("User ID:", user_id);
                } else {
                    console.log("TODO: send post request to Users table");
                }
                return user_id

            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        }

        const fetchAllTransactions = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const user_id = await fetchUserId(token)
                const decodedToken = jwtDecode(token)
                console.log("user email: " + decodedToken.email)
                console.log("user id: " + user_id)

                const headers = {
                    headers: {
                        'token': token,
                    }
                };
                const res = await axios.get(`http://localhost:8800/transactions/${user_id}`, headers)
                setTransactions(res.data)
               
            } catch (err) {
                console.log("ERROR: " + err)
                window.location.href = '/login';
            }
        }
        fetchAllTransactions()

    }, [transactions]) 

    const data = transactions

    const [activeTab, setActiveTab] = useState('spending-history');
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const initialToken = sessionStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const handleSignOut = (e) => {
        setToken(null)
        sessionStorage.setItem('token', null)
        console.log(sessionStorage.getItem('token'))
        window.location.href = '/login';
    }

    return (
        
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Summary" value="summary" />
                    <Tab label="Spending History" value="spending-history" />
                    <Tab label="Payment History" value="paychecks" />
                </Tabs>

                <Button onClick={handleSignOut} variant="outlined" color="error" style={{ marginRight: 0 }}>Sign out</Button>
            </div>
            {activeTab === 'summary' && <Summary transactions={data} />}
            {activeTab === 'spending-history' && <SpendingHistory transactions={data} />}
            {activeTab === 'paychecks' && <Payments transactions={data} />}
        </div>

    );
}


export default Budget;