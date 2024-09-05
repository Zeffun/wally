import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as transactionService from "../services/transactionService";

export default function AccountTransactionsPage(props) {
  const [transactions, setTransactions] = useState([]);
  //aloy, mapping deposits and withdrawals transactions
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [transactionData, updatesData] = await Promise.all([
          transactionService.getTransactionHistory(),
          transactionService.getUpdatesHistory(),
        ]);

        setTransactions(transactionData);
        setUpdates(updatesData);

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [props.user]);

  const ifNegative = (amount) => {
    return amount < 0 ? "withdrawn" : "deposited";
  };
  const color = (event) => {
    return event < 0 ? "red" : "green";
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        <br></br>
        <br></br>
        <Typography sx={{ padding: 2, fontSize: { xs: "1rem", md: "2rem" } }}>
          <h1>Transfers</h1>
        </Typography>
        {transactions.map((transaction, index) => (
          <Card key={index} sx={{ mb: 2, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h5"
                color={
                  transaction.senderAcc.userId == props.user._id &&
                  transaction.receiverAcc.userId == props.user._id
                    ? "blue"
                    : transaction.senderAcc.userId == props.user._id
                    ? "red"
                    : "green"
                }
              >
                ${transaction.amount}
              </Typography>
              <CardContent
                sx={{
                  display: { xs: "block", md: "flex" },
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>
                    <strong>was sent from</strong> Account ID:{" "}
                    {transaction.senderAcc._id}
                  </Typography>
                  <Typography>
                    (
                    {transaction.senderAcc.userId == props.user._id
                      ? "Your account"
                      : "User ID: " + transaction.senderAcc.userId}
                    )
                  </Typography>
                  <Typography>
                    <strong>to</strong> Account ID:{" "}
                    {transaction.receiverAcc._id}
                  </Typography>
                  <Typography>
                    (
                    {transaction.receiverAcc.userId === props.user._id
                      ? "Your account"
                      : "User ID: " + transaction.receiverAcc.userId}
                    )
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ textAlign: { xs: "left", md: "right" }, mt: 4 }}
                  >
                    <strong>Date:</strong> {transaction.createdAt.slice(0, 10)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ textAlign: { xs: "left", md: "right" }, mt: 4 }}
                  >
                    <strong>Purpose:</strong> {transaction.purpose}
                  </Typography>
                </Box>
              </CardContent>
            </CardContent>
          </Card>
        ))}
        <Typography sx={{ padding: 2, fontSize: { xs: "1rem", md: "2rem" } }}>
          <h1>Deposits/Withdrawals</h1>
        </Typography>
        {updates.map((update, index) => (
          <Card key={index} sx={{ mb: 2, width: "100%" }}>
            <CardContent>
              <Typography variant="h5" sx={{ color: color(update.amount) }}>
                ${Math.abs(update.amount)}
              </Typography>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography>
                    <strong>
                      was {ifNegative(update.amount)}{" "}
                      {ifNegative(update.amount) === "deposited"
                        ? "into"
                        : "from"}
                    </strong>
                  </Typography>
                  <Typography>Account ID: {update.account}</Typography>
                  {/* <Typography>to Account ID: {transaction.receiverAcc._id}</Typography>
                            <Typography>(User: {transaction.receiverAcc.userId})</Typography> */}
                </Box>
                {/* <Box>
                            <Typography sx={{textAlign: "right", mt: 8}}>
                                Purpose: {transaction.purpose}
                            </Typography>
                        </Box> */}
                <Box>
                  <Typography
                    sx={{ textAlign: { xs: "left", md: "right" }, mt: 4 }}
                  >
                    <strong>Date:</strong> {update.createdAt.slice(0, 10)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ textAlign: { xs: "left", md: "right" }, mt: 4 }}
                  >
                    <strong>Purpose:</strong> {update.purpose}
                  </Typography>
                </Box>
              </CardContent>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
