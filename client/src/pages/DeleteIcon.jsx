import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import './DeleteIcon.css';


const DeleteIcon = (props) => {
    const handleDelete = () => {
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

		const deleteTransactionFromDB = async () => {
			try {
				const token = sessionStorage.getItem('token')
                console.log(token)
				const user_id = await fetchUserId(token)
                console.log("line 33")

				const headers = {
					headers: {
						'token': token,
                        'id': props.id
					}
				};
                console.log("props id: " + props.id)

				const data = {
					'id': props.id
				}
                console.log("line 45 prop id: " + props.id)
                console.log("line 46, user id: " + user_id)
                console.log("line 47 token: " + token)
				await axios.delete(`http://localhost:8800/transactions/${user_id}`, headers)

			} catch (err) {
				console.log("Bad input" + err)
			}
		}
		deleteTransactionFromDB()
    }
    return (<>
    
    <button className = 'deleteButton' onClick = {handleDelete}>Remove</button>
    

    

    
      </>)
}

  export default DeleteIcon