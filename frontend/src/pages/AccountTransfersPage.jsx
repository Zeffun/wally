import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { newTransfer } from "../services/transfService";
import { getAccounts } from "../services/authService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const currencies = [
  {
    value: "SGD",
    label: "SGD",
  },
];
export default function AccountTransfersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [transferData, setTransferData] = useState({
    senderAcc: "",
    receiverAcc: "",
    currency: "SGD",
    amount: 0,
    purpose: "from react",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(transferData);
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "35ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100vh",
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
          label="Receipient account no."
          name="receiverAcc"
          value={transferData.receiverAcc}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>Send from:</Box> {/* Label on the left */}
        <TextField
          id="senderAcc"
          select
          label="Please select sending account"
          helperText=""
          name="senderAcc"
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
        <Button variant="contained" onClick={handleSubmit}>
          Send now
        </Button>
      </Box>
    </Box>
  );
}
