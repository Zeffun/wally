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
          console.log(typeof data[0].amount)
        };
        loadUpdates();
        
      }, [])

    const ifNegative = (amount) => {return amount < 0 ? ("withdrawn") : ("deposited")}

    return (
        <>
            <h1>Transactions</h1>
            <br></br>
            <h2>Transfers</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        <br></br>
                        <strong>${transaction.amount}</strong> sent from <strong>Account ID: {transaction.senderAcc._id}</strong> <u>(User: {transaction.senderAcc.userId})</u> to <strong>Account ID: {transaction.receiverAcc._id}</strong> <u>(User: {transaction.receiverAcc.userId})</u> for <em>{transaction.purpose}</em>
                    </li>
                ))}
            </ul>
            <br></br>
            <h2>Deposits/Withdrawals</h2>
            <ul>
                 {updates.map((update, index) => (
                    <li key={index}>
                        <br></br>
                        <strong>${Math.abs(update.amount)}</strong> was {ifNegative(update.amount)} {ifNegative(update.amount) === "deposited" ? "into" : "from"} <strong>Account ID: {update.account}</strong>
                    </li>
                ))}
            </ul>
        </>
    ) 
};