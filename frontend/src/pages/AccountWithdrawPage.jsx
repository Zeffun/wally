import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Paper,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { getAccounts } from "../services/authService";

export default function AccountWithdrawPage() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: "",
    balance: 0,
  });
  const [withdrawTransaction, setWithdrawTransaction] = useState({
    account: "",
    currency: "SGD",
    amount: 0,
    purpose: "WITHDRAWAL",
  });

  const errorMessage = (msg) => setErrorMsg(msg);

  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
    };
    loadAccount();
  }, []);

  const handleChangeAccounts = (event) => {
    const { name, value } = event.target;
    setAccountId(value);
    setWithdrawTransaction({ ...withdrawTransaction, [name]: value });
  };

  const handleChange = (event) => {
    const amountRegex = /^\d*\.?\d{0,2}$/;
    const { name, value, id } = event.target;
    if (value === "") {
      setAccountData({ ...accountData, [name]: value });
      setWithdrawTransaction({ ...withdrawTransaction, [id]: value });
      setError(null);
    }
    if (amountRegex.test(value)) {
      setAccountData({ ...accountData, [name]: value });
      setWithdrawTransaction({ ...withdrawTransaction, [id]: value });
      setError(null);
    } else {
      setError("Invalid amount");
    }
  };

  const handleCurrency = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const balance = parseFloat(accountData.balance);
      const amount = -parseFloat(withdrawTransaction.amount);
      if (balance > accounts.balance) {
        errorMessage("Insufficient Balance!!");
      }
      await authService.withdrawAccount(
        { ...accountData, balance },
        accountId
      );
      await authService.updateTransaction(
        { ...withdrawTransaction, amount },
        accountId
      );
      
      navigate("/account/main");
    } catch (err) {
      errorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
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
          <Typography>{errorMsg}</Typography>
          <Box sx={{ marginBottom: 1 }}>
            <FormControl sx={{ width: "300px", marginBottom: 1 }}>
              <TextField
                select
                name="account"
                label="Account"
                value={accountId}
                onChange={handleChangeAccounts}
                required
              >
                {accounts.map((account) => (
                  <MenuItem key={account._id} value={account._id}>
                    {account._id}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          {/* <Box sx={{ marginBottom: 1 }}>
             <TextField
              id="acId"
              label="acId"
              fullWidth
              margin="dense"
              variant="outlined"
              name="acId"
              value={accountData.acId}
              onChange={handleChange}
              required
             />
           </Box> */}
          <Box sx={{ marginBottom: 1 }}>
            {/* <TextField
               id="currency"
               label="currency"
               fullWidth
               margin="dense"
               variant="outlined"
               name="currency"
               value={accountData.currency}
               onChange={handleChange}
               required
             /> */}
            <FormControl sx={{ width: "300px", mb: 1 }}>
              <TextField
                label="Currency"
                select
                id="currency"
                name="currency"
                value={accountData.currency}
                onChange={handleCurrency}
                required
              >
                <MenuItem value="SGD">SGD</MenuItem>
              </TextField>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 1 }}>
            <TextField
              id="amount"
              label="amount"
              fullWidth
              margin="dense"
              variant="outlined"
              name="balance"
              value={accountData.balance}
              onChange={handleChange}
              error={error}
              helperText={error}
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </Paper>
      </Box>
    </>
  );
}
