import { AuthedUserContext } from "../App";
import { useContext } from "react";
import * as transactionService from "../services/transactionService";

export default function AccountTransactionsPage() {

    const user = useContext(AuthedUserContext);

    const handleClick = async (userId) => {
        const transactions = await transactionService.getTransactionHistory(userId);
        console.log(transactions);
    };

    return (
        <>
            <h1>Transactions</h1>
            <button onClick={() => handleClick(user._id)}></button>
        </>
    )
};