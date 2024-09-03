import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { getAccounts } from '../services/authService';



export default function AccountDepositsPage() {
  
  
  const navigate = useNavigate()
  const [accountId, setAccountId] = useState ("")
  const [accounts, setAccounts] = useState([])
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: '',
    balance: 0,
  });

  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
    };
    loadAccount();
  }, [])

  const handleChangeAccounts = (event) => {
    const { value } = event.target;
    setAccountId(value)
    console.log(value)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value })
  };

  const handleCurrency = (event) => {
    const { name, value } = event.target;
    setAccountData({...accountData, [name]: value})
  }

  const handleDeposit = async (event) => {
    event.preventDefault();
    try {
      const balance = parseFloat(accountData.balance)
      const newUserResponse = await authService.depositAccount({...accountData, balance}, accountId);
      console.log(newUserResponse);
      navigate('/account/main');
    } catch (err) {
      console.error(err.message);
    }
  };
  
    
    return(
        <Box
            component="form"
            sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}
            noValidate
            autoComplete="off"          
        >
         <Paper 
         elevation={10}
         sx = {{padding: 6}}
         >
            <Box sx={{marginBottom: 1}}>
              <FormControl sx={{width: "300px", mb: 1}}>
              <InputLabel>Account</InputLabel>
              <Select
              value= {accountId}
              onChange={handleChangeAccounts}
              >
                {accounts.map((account) => (<MenuItem key={account._id} value = {account._id}>{account._id}</MenuItem>))}
              </Select>
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
             <FormControl sx={{width: "300px", mb: 1}}>
              <InputLabel>Currency</InputLabel>
              <Select
              id="currency"
              name="currency"
              value={accountData.currency}
              onChange={handleCurrency}
              required
              >
                <MenuItem value = "SGD" >SGD</MenuItem>
              </Select>
              </FormControl>
           </Box>
           <Box sx={{ marginBottom: 1 }}>
             <TextField
               id="balance"
               label="amount"
               fullWidth
               margin="dense"
               variant="outlined"            
               name="balance"
               value={accountData.balance}
               onChange={handleChange}
               required
             />
           </Box>
           <Button
             fullWidth
             variant="contained"
             color="primary"
             type="submit"
             sx={{ mt: 2 }}
             onClick={handleDeposit}
           >
             Deposit
           </Button>
         </Paper>
        </Box>
     )}


