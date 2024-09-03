import { useState, useEffect } from "react";
import * as transactionService from "../services/transactionService";

export default function AccountTransactionsPage() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
      const loadTransactions = async () => {
        const data = await transactionService.getTransactionHistory();
        setTransactions(data);
      };
      loadTransactions();
      
    }, [])

    

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
            </ul>
        </>
    ) 
};