import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  MenuItem,
  Tooltip,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import * as authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [accountData, setAccountData] = useState({
    acId: "",
    currency: "",
    balance: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value });
  };
  const handleChangeAmt = (event) => {
    const amountRegex = /^\d*\.?\d{0,2}$/;
    const value = event.target.value;
    if (value === "" || amountRegex.test(value)) {
      setAccountData({ ...accountData, balance: value });
      setError(null);
    } else {
      setError("Invalid amount");
    }
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

  return (
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
      <Paper elevation={10} sx={{ padding: 6 }}>
        <Typography>CreateAccount</Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Tooltip
            title="Other users will be able to see this name"
            placement="top-end"
          >
            <TextField
              id="acId"
              label="Insert Friendly Name"
              fullWidth
              margin="dense"
              variant="outlined"
              name="acId"
              value={accountData.acId}
              onChange={handleChange}
              required
            />
          </Tooltip>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormControl sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Currency"
              select
              id="currency"
              name="currency"
              value={accountData.currency}
              onChange={handleChange}
              required
            >
              <MenuItem value="SGD">SGD</MenuItem>
            </TextField>
          </FormControl>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            id="balance"
            label="Balance"
            fullWidth
            margin="dense"
            variant="outlined"
            name="balance"
            value={accountData.balance}
            onChange={handleChangeAmt}
            error={error}
            helperText={error}
            required
          />
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
          By signing up, you agree to wally's terms and conditions.
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
          Your particulars will only be visible to wally.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          + Create Account
        </Button>
      </Paper>
    </Box>
  );
}
