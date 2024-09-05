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
  };

  const handleChangeAmt = (event) => {
    const amountRegex = /^\d*\.?\d{0,2}$/;
    const value = event.target.value;
    if (value === "") {
      setTransferData({ ...transferData, amount: value });
      setError(null);
      return;
    }
    if (amountRegex.test(value)) {
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
          "& .MuiTextField-root": { m: 1.5, width: "35ch" }, // TextField margin and width
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          height: "100vh",
          paddingTop: "64px",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Align the text fields and labels to the left
          }}
        >
          <Box sx={{ marginRight: 2 }}>Send it to : </Box>{" "}
          <TextField
            id="controlled acnum"
            label={recName}
            name="receiverAcc"
            value={transferData.receiverAcc}
            sx={boxShadowStyle}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Align button to the right
            width: "100%", // Full width
            maxWidth: "400px", // Limit the width of the main container
            mt: 0.25, // Add some spacing above the button
          }}
        >
          <Button onClick={handleCheckName}>Check receipient</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginRight: 2 }}>Send from:</Box>{" "}
          {/* Label on the left */}
          <TextField
            id="senderAcc"
            select
            label="Please select sending account"
            helperText=""
            value={transferData.senderAcc}
            name="senderAcc"
            sx={boxShadowStyle}
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
            width: "46ch",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginRight: 2 }}>Currency</Box> {/* Label on the left */}
          <TextField
            id="currency"
            select
            label="Select currency"
            defaultValue="S$"
            helperText=""
            value={transferData.currency}
            name="currency"
            sx={boxShadowStyle}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ marginRight: 2 }}>Amt:</Box> {/* Label on the left */}
          <TextField
            id="amt"
            label=""
            value={transferData.amount}
            name="amount"
            sx={boxShadowStyle}
            onChange={handleChangeAmt}
            error={error}
            helperText={error}
          />
        </Box>
        <Box
          sx={{
            width: "46ch",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginRight: 2 }}>Purpose:</Box> {/* Label on the left */}
          <TextField
            id="Purpose"
            label="Purpose of transfer"
            variant="filled"
            name="purpose"
            sx={boxShadowStyle}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Align button to the right
            width: "100%", // Full width
            maxWidth: "400px", // Limit the width of the main container
            mt: 3, // Add some spacing above the button
          }}
        >
          <Button
            sx={boxShadowStyle}
            variant="contained"
            onClick={handleSubmit}
          >
            Send now
          </Button>
        </Box>
      </Box>
    </>
  );
}
