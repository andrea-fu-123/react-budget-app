const helpers = require('./helpers.js');

describe('getSummaryTransactions', () => {
    let mockTransactions = [] // mock transactions must be added ordered by date to mimc ORDER BY in SQL 
    beforeEach(() => {
  
        mockTransactions = []
    
    });

    test('happy-case (receieve and spend on different days) getSummaryTransactions', () => {
        mockTransactions.push({
            date: '2024-10-30 00:00:00', 
            amount: '200',
            id: '47'
        })
        mockTransactions.push({
            date: '2024-08-12 00:00:00', 
            amount: '-44.6',
            id: '42'
        })
        mockTransactions.push({
            date: '2023-08-12 00:00:00', 
            amount: '-35.25',
            id: '43'
        })
        mockTransactions.push({
            date: '2023-08-12 00:00:00', 
            amount: '-44.6',
            id: '44'
        })
        mockTransactions.push({
            date: '2023-08-12 00:00:00', 
            amount: '100.10',
            id: '42'
        })
        mockTransactions.push({
            date: '2022-09-30 00:00:00', 
            amount: '-100.01',
            id: '44'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '-333.078',
            id: '36'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '-333.078',
            id: '37'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '-333.078',
            id: '38'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '333.078',
            id: '6'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '333.078',
            id: '7'
        })
        mockTransactions.push({
            date: '2020-01-01 00:00:00', 
            amount: '333.078',
            id: '8'
        })
        let result = helpers.getSummaryList(mockTransactions, 0.8)

        expect(result.length).toBe(3);

        expect(result[0].date).toBe('Oct 30, 2024')
        expect(result[0].totalAmount).toBe('200.00')
        expect(result[0].spendable).toBe('160.00')
        expect(result[0].totalSpent).toBe('0.00')

        expect(result[1].date).toBe('Aug 12, 2023')
        expect(result[1].totalAmount).toBe('100.10')
        expect(result[1].spendable).toBe('80.08')
        expect(result[1].totalSpent).toBe('124.45')

        expect(result[2].date).toBe('Jan 1, 2020')
        expect(result[2].totalAmount).toBe('999.23')
        expect(result[2].spendable).toBe('799.38')
        expect(result[2].totalSpent).toBe('1099.24')
    });

 







    // Add more tests if needed
});