import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { newTransfer } from "../services/transfService";
import { getAccountById, getAccounts } from "../services/authService";
import { Container, Typography, Paper } from "@mui/material";
// import Stack from "@mui/material/Stack";

const currencies = [
  {
    value: "SGD",
    label: "SGD",
  },
];

const boxShadowStyle = {
  boxShadow: "-4px 4px 6px rgba(0, 0, 0, 0.1)",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: (theme) => theme.palette.primary.main,
    },
  },
};
export default function AccountTransfersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [recName, setRecName] = useState("Receipient account no.");
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null);
  const [transferData, setTransferData] = useState({
    senderAcc: "",
    receiverAcc: "",
    currency: "SGD",
    amount: 0,
    purpose: "",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransferData({ ...transferData, [name]: value });

    if (value === "" || value.length <= 36) {
      setFieldError(null);
    } else {
      // Show error if length exceeds 36 characters
      setFieldError("Please limit to 36 characters or less.");
    }
  };

  const handleChangeAmt = (event) => {
    const amountRegex = /^\d*\.?\d{0,2}$/;
    const value = event.target.value;
    if (value === "" || amountRegex.test(value)) {
      setTransferData({ ...transferData, amount: value });
      setError(null);
    } else {
      setError("Invalid amount");
    }
  };
  const handleCheckName = async (event) => {
    event.preventDefault();
    try {
      // Extract receiverAcc from transferData
      const { receiverAcc } = transferData;

      // Call getAccountById with receiverAcc as a parameter
      const checkNameResponse = await getAccountById({
        accountId: receiverAcc,
      });
      const { acId } = checkNameResponse;
      setRecName(acId);
    } catch (err) {
      console.error(err.message);
      setRecName("No account found");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const amount = parseFloat(transferData.amount);
      const newTransferResponse = await newTransfer({
        ...transferData,
        amount,
      });
      console.log(newTransferResponse);
      navigate("/account/main");
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
    };
    loadAccount();
  }, []);

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        component="form"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Paper elevation={10} sx={{ padding: 3, width: {xs: "90%", md: "30%"}}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mb: 1, // Align the text fields and labels to the left
            }}
          >
            <Typography sx={{ marginRight: 2 , fontSize: {xs: "80%", md: "100%"}}}>Send it to : </Typography>{" "}
            <TextField
              id="controlled acnum"
              label={recName}
              name="receiverAcc"
              value={transferData.receiverAcc}
              sx={{width: "70%"}}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{display: "flex", justifyContent: {xs: "center", md: "flex-end"}, mr: 2.5, mb: 1}}>
          <Button onClick={handleCheckName}>Check receipient</Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              mb: 2.5,
            }}
          >
            <Typography sx={{ marginRight: 2, fontSize: {xs: "80%", md: "100%"} }}>Send from:</Typography>{" "}
            {/* Label on the left */}
            <TextField
              id="senderAcc"
              select
              label="Please select sending account"
              helperText=""
              value={transferData.senderAcc}
              name="senderAcc"
              sx={{width: "70%"}}
              onChange={handleChange}
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account._id}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
          sx={{         
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            mb: 2.5
          }}
        >
          <Typography sx={{ marginRight: {xs: 1, md: 3}, fontSize: {xs: "80%", md: "100%"} }}>Currency</Typography> {/* Label on the left */}
          <TextField
            id="currency"
            select
            label="Select currency"
            defaultValue="S$"
            helperText=""
            value={transferData.currency}
            name="currency"
            sx={{width: {xs: "40%", md: "28%"} }}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography sx={{ marginRight: {xs: 1, md: 2}, ml: {xs: 1, md: 2}, fontSize: {xs: "80%", md: "100%"} }}>Amt:</Typography> {/* Label on the left */}
          <TextField
            id="amt"
            label=""
            value={transferData.amount}
            name="amount"
            sx={{width: "28%"}}
            onChange={handleChangeAmt}
            error={error}
            helperText={error}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Typography sx={{ marginRight: 3, fontSize: {xs: "80%", md: "100%"} }}>Purpose:</Typography> {/* Label on the left */}
          <TextField
            id="Purpose"
            label="Purpose of transfer"
            variant="filled"
            name="purpose"
            sx={{width: "71%"}}
            onChange={handleChange}
            error={fieldError}
            helperText={fieldError}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {xs: "center", md: "flex-end"}, // Align button to the right
            width: "100%", // Full width
            maxWidth: "400px", // Limit the width of the main container
            mt: 3, // Add some spacing above the button
          }}
        >
          <Button
            sx={{mr: {xs: 0, md: 3}}}
            variant="contained"
            onClick={handleSubmit}
          >
            Send now
          </Button>
          
        </Box>
        </Paper>
      </Box>
    </>
  );
}
