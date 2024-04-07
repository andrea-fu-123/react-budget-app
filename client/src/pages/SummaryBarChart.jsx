// this import is required. 
import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";
const SpendingBarChart = (props) => {

    let spendingDates = []
    let spendings = []
    let earnings = []
    let count = 0
    props.transactions.forEach((transaction) => {
        if (count < 13) {
            spendingDates.push(transaction.date)
            spendings.push(transaction.totalSpent)
            earnings.push(transaction.totalAmount)
        }

        count ++
    })


    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Summary Bar Chart (most recent 13 paychecks)',
            },
        },
    };
    const data = {
        labels: spendingDates,
        datasets: [
            {
                label: "Total spending",
                data: spendings,
                borderColor: ['rgb(245,100,100)'],
                backgroundColor: ['rgb(245,100,100)'],
                pointBackgroundColor: 'rgb(245,100,100)',
                pointBorderColor: 'rgb(245,220,100)',
            },           
            {
                label: "Paycheck amounts",
                data: earnings,
                borderColor: ['rgb(100,245,100)'],
                backgroundColor: ['rgb(100,245,100)'],
                pointBackgroundColor: 'rgb(100,245,100)',
                pointBorderColor: 'rgb(100,220,100)',
            },
        ],
    };

    return (
        <>
            <div>
                <Bar options={options} data={data} />
            </div>
        </>

    );
}

export default SpendingBarChart