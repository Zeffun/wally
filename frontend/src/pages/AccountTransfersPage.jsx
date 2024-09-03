import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const accounts = [
  {
    value: "100000000011231231231231231",
    label: "100000000011231231231231231",
  },
  {
    value: "123",
    label: "No.",
  },
];

const currencies = [
  {
    value: "S$",
    label: "SGD",
  },
];
export default function AccountTransfersPage() {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: "",
    balance: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const balance = parseFloat(accountData.balance);
      const newAccountResponse = await authService.createAccount({
        ...accountData,
        balance,
      });
      console.log(newAccountResponse);
      navigate("/account/main");
    } catch (err) {
      console.error(err.message);
    }
  };
  const [acnum, setAcnum] = useState("Receipient Account");
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "35ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        height: "100vh",
        paddingRight: 80,
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
        <Box sx={{ marginRight: 2 }}>Send to:</Box> {/* Label on the left */}
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
        <Box sx={{ marginRight: 1 }}>Currency</Box> {/* Label on the left */}
        <TextField
          id="outlined-select-currency"
          select
          label="Select currency"
          defaultValue="S$"
          helperText=""
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ marginRight: 1 }}>Amt:</Box> {/* Label on the left */}
        <TextField id="amt" label="" value="" />
      </Box>
    </Box>
  );
}
