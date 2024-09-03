import { useState, useEffect } from "react";
import * as transactionService from "../services/transactionService";

export default function AccountTransactionsPage() {

    const [transactions, setTransactions] = useState([])
    //aloy, mapping deposits and withdrawals transactions
    const [updates, setUpdates] = useState([])

    useEffect(() => {
      const loadTransactions = async () => {
        const data = await transactionService.getTransactionHistory();
        setTransactions(data);
        console.log(data[0].amount)
        
      };
      loadTransactions();
      
    }, [])
     //aloy, mapping deposits and withdrawals transactions
    useEffect(() => {
        const loadUpdates = async () => {
          const data = await transactionService.getUpdatesHistory();
          setUpdates(data);
          console.log(data[0])
        };
        loadUpdates();
        
      }, [])

    // const ifNegative = (amount) => {return -amount ? (withdrawn)}

    return (
        <>
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        <br></br>
                        ${transaction.amount} sent from Account {transaction.senderAcc.acId} (User: {transaction.senderAcc.userId}) to Account {transaction.receiverAcc.acId} (User: {transaction.receiverAcc.userId}) for {transaction.purpose}
                    </li>
                ))}
                 {updates.map((update, index) => (
                    <li key={index}>
                        <br></br>
                        ${update.amount}
                    </li>
                ))}
            </ul>
        </>
    ) 
};