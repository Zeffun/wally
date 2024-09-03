import { AuthedUserContext } from "../App";
import { useState, useEffect, useContext } from "react";
import * as transactionService from "../services/transactionService";
import { getUser } from "../services/authService";

export default function AccountTransactionsPage() {

    const user = useContext(AuthedUserContext);

    // const getUserTransactionHistory = async () => {
    //     const userTransactions = await transactionService.getTransactionHistory();
    //     return userTransactions;
    // };

    // const transactions = getUserTransactionHistory();

    

    // console.log(transactions);

    

    return (
        <>
            <h1>Transactions</h1>
            
        </>
    ) 
};