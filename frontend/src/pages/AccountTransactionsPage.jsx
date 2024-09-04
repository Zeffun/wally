import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
    const color = (event) => {return event < 0 ? ("red") : ("green")}

    return (
        <>
            <Box
                component="section"
                sx={{
                    p: 2,
                    display: { xs: "block", md: "flex" },
                    flexDirection: "column",
                    width: "80%",
                    //   height: { xs: "auto", md: "20vh" },
                    margin: "0 auto",
                    //   justifyContent: { xs: "center", md: "space-around" },
                    //   alignItems: "center",
                    //   flexWrap: "wrap",
                    boxShadow: 3,
                    marginTop: "20px",
                }}
            >
                <Typography  sx={{ padding: 2, fontSize:{ xs: "1rem", md: "2rem"} }}>Transfers</Typography>
                {transactions.map((transaction, index) => (
                    <Card key={index} sx={{ mb: 2, width: "100%" }}>
                        <CardContent>
                            <Typography variant="h5">${transaction.amount}</Typography>
                            <CardContent sx={{ display: {xs: "block",  md: "flex"}, justifyContent: "space-between" }}>
                                <Box>
                                    <Typography>sent from Account ID: {transaction.senderAcc._id}</Typography>
                                    <Typography>(User: {transaction.senderAcc.userId})</Typography>
                                    <Typography>to Account ID: {transaction.receiverAcc._id}</Typography>
                                    <Typography>(User: {transaction.receiverAcc.userId})</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ textAlign: {xs: "left", md: "right"}, mt: 8 }}>
                                        Purpose: {transaction.purpose}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardContent>
                    </Card>
                ))}
                <Typography sx={{ padding: 2, fontSize:{ xs: "1rem", md: "2rem"} }}>Deposits/Withdrawals</Typography>
                {updates.map((update, index) => (
                    <Card key={index} sx={{ mb: 2, width: "100%" }}>
                        <CardContent>
                            <Typography variant="h5" sx = {{color: color(update.amount)}}>${(update.amount)}</Typography>
                            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box>
                                    <Typography>was {ifNegative(update.amount)} {ifNegative(update.amount) === "deposited" ? "into" : "from"}</Typography>
                                    <Typography>Account ID: {update.account}</Typography>
                                    {/* <Typography>to Account ID: {transaction.receiverAcc._id}</Typography>
                            <Typography>(User: {transaction.receiverAcc.userId})</Typography> */}
                                </Box>
                                {/* <Box>
                            <Typography sx={{textAlign: "right", mt: 8}}>
                                Purpose: {transaction.purpose}
                            </Typography>
                        </Box> */}
                            </CardContent>
                        </CardContent>
                    </Card>
                ))}

            </Box>
        </>
    )
};