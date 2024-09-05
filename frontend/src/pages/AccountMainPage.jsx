import { getAccounts } from "../services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import * as React from "react";

export default function AccountMainPage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
        if (data.length >= 3) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadAccount();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/account/createAccount");
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
          width: "80%",
          height: { xs: "20vh", md: "20vh" },
          margin: "0 auto",
          justifyContent: { xs: "center", md: "space-around" },
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: 3,
          marginTop: "100px",
          paddingTop: "15px",
        }}
      >
        {accounts.map((account, index) => {
          const formattedBalance = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(account.balance);

          return (
            <Card
              key={index}
              sx={{
                width: { xs: "100%", md: "200px" },
                height: { xs: "100%", md: "130px" },
                display: { xs: "block", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 2, md: 0 },
                backgroundColor: "#f3e9e7",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ fontSize: 20 }}
                >
                  {account.acId}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Account ID: {account._id}
                </Typography>
                <Typography variant="h5" component="div">
                  ${formattedBalance}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Box
        sx={{
          p: 2,
          display: { xs: "flex", md: "flex" },
          width: {xs:"50%", md: "15%"},
          height: "100%",
          margin: "0 auto",
          justifyContent: { xs: "space-around", md: "space-around" },
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: 3,
          marginTop: "20px",
        }}
      >
        <Button
          disabled={disabled}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Create Account
        </Button>
      </Box>
    </>
  );
}
