import React, { useEffect, useState } from 'react';
import './Table.css';
import SpendingBarChart from './SummaryBarChart';
import './Summary.css';
const helpers = require('../utils/helpers');


const Summary = (props) => {
    const [spendable, setSpendable] = useState(0.8)

    let summaryTransactions = helpers.getSummaryList(props.transactions, spendable)


    return (
        <>
            <div style={{ textAlign: 'center' , padding: 30}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70%',
                    height: '70vh',
                    margin: '0 auto', // Center the container horizontally using margin
                }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <SpendingBarChart transactions={summaryTransactions} />
                    </div>

                </div>

                
                <div className = "summary-table">
                <h3>Summary</h3>
                    <table style={{ margin: '0 auto' }}>
                        <thead>
                            <tr>
                                <th>Paycheck Date</th>
                                <th>Total Amount ($)</th>
                                <th>Spendable ($)</th>
                                <th>Total Spent ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className='td-2'>{transaction.date}</td>
                                    <td className='td-2'>{transaction.totalAmount}</td>
                                    <td className='td-2'>{transaction.spendable}</td>
                                    <td className='td-2'>{transaction.totalSpent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </>


    )
}

export default Summary
