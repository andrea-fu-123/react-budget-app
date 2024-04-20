// this also needs spendable passed in

let steps = 0
function getSummaryList(transactions, spendable) {
    let result = []
    let totalAmountSpent = 0
    let paycheckAmount = 0
    let k = 0
    let nextId = -1
    
    while (k < transactions.length ){
        if (transactions[k].amount < 0) {
            totalAmountSpent += Number(transactions[k].amount)
            k++
        } else {
            nextId++
            paycheckAmount = sumPositiveTransactionOnDate(transactions, transactions[k].date, k)
            result.push({
                id: nextId,
                date: formatDate(transactions[k].date),
                totalAmount: Number(paycheckAmount).toFixed(2),
                spendable: (Number(paycheckAmount) * 0.8).toFixed(2),
                totalSpent: Number(totalAmountSpent * -1).toFixed(2)
            })
            k += steps
            steps = 0
            paycheckAmount = 0
            totalAmountSpent = 0
        }

    }

    return result
}


function sumPositiveTransactionOnDate(transactions, currentDate, j) {
    let sum = 0

    for (let i = j; i < transactions.length ; i++) {
        if (Number(transactions[i].amount) >= 0 && transactions[i].date === currentDate) {
            sum += Number(transactions[i].amount)
            steps++
        }
       
    }
    return sum.toFixed(2)
}


// date should be formatted 

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

function getSpentHistory(transactions) {

    let negativeTransactions = []
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount < 0) {
            let formattedDate = formatDate(transactions[i].date)
            negativeTransactions.push({
                id: transactions[i].id,
                date: formattedDate,
                amount: transactions[i].amount
            })
        }
    }
    return negativeTransactions;
}
function getPaycheckHistory(transactions) {

    let positiveTransactions = []
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].amount > 0) {
            let formattedDate = formatDate(transactions[i].date)
            positiveTransactions.push({
                id: transactions[i].id,
                date: formattedDate,
                amount: transactions[i].amount
            })
        }
    }
    return positiveTransactions;
}






module.exports = { getSummaryList, getSpentHistory, getPaycheckHistory}