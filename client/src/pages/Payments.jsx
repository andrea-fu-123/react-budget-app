import React from 'react';
import './Table.css';
import { getPaycheckHistory } from '../utils/helpers';
import { useState, useEffect } from 'react';
import AddTransactionForm from './AddTransactionForm';
import DeleteIcon from './DeleteIcon';


const Payments = (props) => {

  // let negativeTransactions = getSpentHistory(props.transactions) // TODO
  const [positiveTransactions, setPositiveTransactions] = useState([]);

  useEffect(() => {
    // Fetch data or perform calculations to get negativeTransactions
    const transactions = props.transactions; // Assuming props.transactions contains the transaction data
    const calculatedPositiveTransactions = getPaycheckHistory(transactions); // TODO: Implement getSpentHistory

    // Update state with the calculated negativeTransactions
    setPositiveTransactions(calculatedPositiveTransactions);
  }, [props.transactions]);
  console.log(positiveTransactions.length)
  return (
    <>
    <div style={{ textAlign: 'right', padding: 10,   display: 'flex', justifyContent: 'center',
  alignItems: 'center'}}>
        <AddTransactionForm mode = 'Payment'/>
    </div>
    
      <div style={{ textAlign: 'center' }}>
        <h1>Payment History</h1>
        <div>
          <table style={{ margin: '0 auto' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Spent ($) </th>
              </tr>
            </thead>
            <tbody>
              {positiveTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className='td-3'>{transaction.date}</td>
                  <td className='td-3'>{ transaction.amount}</td>
                  <td className = 'td-container'>
                  <DeleteIcon id = {transaction.id}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

      </div>
    </>

  )
}

export default Payments
