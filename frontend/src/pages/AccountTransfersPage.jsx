import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { newTransfer } from "../services/transfService";

const accounts = [
  {
    value: "66d57482ce2adcf76dfba383",
    label: "66d57482ce2adcf76dfba383",
  },
  {
    value: "123",
    label: "No.",
  },
];

const currencies = [
  {
    value: "SGD",
    label: "SGD",
  },
];
export default function AccountTransfersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [transferData, setTransferData] = useState({
    receiverAcc: "",
    currency: "SGD",
    amount: 0,
    purpose: "from react",
  });
  const [acnum, setAcnum] = useState("Receipient Account");

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const amount = parseFloat(transferData.amount);
      const newTransferResponse = await authService.createAccount({
        ...accountData,
        balance,
      });
      console.log(newAccountResponse);
      navigate("/account/main");
    } catch (err) {
      console.error(err.message);
    }
  };

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
        {/* Label on the left */}
        <TextField
          id="controlled acnum"
          label="Receipient account no."
          value={acnum}
          onChange={(event) => {
            setAcnum(event.target.value);
          }}
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
          id="outlined-select-currency"
          select
          label="Please select sending account"
          defaultValue="123"
          helperText=""
        >
          {accounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
          id="outlined-select-currency"
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
    </Box>
  );
}
