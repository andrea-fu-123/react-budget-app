import React, { useState } from 'react';
import { Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import moment from 'moment';
import './AddTransactionForm.css';

import { DatePicker } from "@progress/kendo-react-dateinputs";
import '@progress/kendo-theme-default/dist/all.css';

export default function AddPopup(props) {
	const [selectedDate, setSelectedDate] = useState(new Date());
	let [amount, setAmount] = useState('');

	const handleDateChange = ({ value }) => {
		console.log("selected Date is: " + selectedDate)
		setSelectedDate(value);
	};

	const handleChange = (event) => {
		setAmount(event.target.value);
	};
	const handleAdd = (e) => {
		const fetchUserId = async (token) => {
			try {
				const decodedToken = jwtDecode(token)
				const email = decodedToken.email
				const users = await axios.get("http://localhost:8800/users")
				const user = users.data.find(transaction => transaction.email === email);

				let user_id = -1
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

		const addTransactionToDB = async () => {
			try {
				const token = sessionStorage.getItem('token')
				const user_id = await fetchUserId(token)

				const headers = {
					headers: {
						'token': token,
					}
				};
				const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

				if (amount > 0) {
					if (props.mode === 'Spending') {
						amount *= -1
					}
					const data = {
						'date': formattedDate,
						'amount': amount,
					}
					await axios.post(`http://localhost:8800/transactions/${user_id}`, data, headers)
					
				} 

			} catch (err) {
				console.log("Bad input")
			}
		}
		addTransactionToDB()
		console.log("selected Date: " + selectedDate)
	}

	return (
		<div>
			<div className='content'>

				<h4>Add {props.mode}</h4>

				<div className='add-header-container'>
					<p>Amount: </p>
					<input className = 'input'
						type="number"
						value={amount}
						onChange={handleChange}
						placeholder="Enter amount"

					/>
				</div>
				<p>Date:</p>
				<DatePicker
					value={selectedDate}
					onChange={handleDateChange}
					
				/>
				<Button variant="contained" color="success" size="small" onClick={() => {
					// and also check inputs here. if the inputs don't work, clear the text fields and don't make the API call
					handleAdd();
				}}> Confirm </Button>
			</div>
		</div>




	)
};