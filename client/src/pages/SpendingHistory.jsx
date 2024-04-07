import React from 'react';
import './Table.css';
import { getSpentHistory } from '../utils/helpers';
import { useState, useEffect } from 'react';
import AddTransactionForm from './AddTransactionForm';



const SpendingHistory = (props) => {

  // let negativeTransactions = getSpentHistory(props.transactions) // TODO
  const [negativeTransactions, setNegativeTransactions] = useState([]);

  useEffect(() => {
    // Fetch data or perform calculations to get negativeTransactions
    const transactions = props.transactions; // Assuming props.transactions contains the transaction data
    const calculatedNegativeTransactions = getSpentHistory(transactions); // TODO: Implement getSpentHistory

    // Update state with the calculated negativeTransactions
    setNegativeTransactions(calculatedNegativeTransactions);
  }, [props.transactions]);
  console.log(negativeTransactions.length)
  return (
    <>
      <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'right', padding: 10,   display: 'flex', justifyContent: 'center',
  alignItems: 'center'}}>
        <AddTransactionForm mode = 'Spending'/>
    </div>
        <h1>Spending History</h1>
        <div>
          <table style={{ margin: '0 auto' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Spent ($) </th>
              </tr>
            </thead>
            <tbody>
              {negativeTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className='td-1'>{transaction.date}</td>
                  <td className='td-1'>{-1 * transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>

  )
}

export default SpendingHistory
