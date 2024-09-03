import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, Select, FormControl, MenuItem, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import * as authService from '../services/authService';
import { getAccounts } from '../services/authService';



export default function AccountWithdrawPage() {
  
  
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const [accountId, setAccountId] = useState ("")
  const [accounts, setAccounts] = useState([])
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: '',
    balance: 0,
  });

  const errorMessage = (msg) => setErrorMsg(msg)

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

  const handleCurrency = (event) => {
    const { name, value } = event.target;
    setAccountData({...accountData, [name]: value})
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value })
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();
    try {
      const balance = parseFloat(accountData.balance)
      if (balance > accounts.balance){
        errorMessage("Insufficient Balance!!")
      }
      const newUserResponse = await authService.withdrawAccount({...accountData, balance}, accountId);
      console.log(newUserResponse);
      navigate("/account/main")
    } catch (err) {
      errorMessage(err.message);
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
            <Typography>{errorMsg}</Typography>
            <Box sx={{marginBottom: 1}}>
              <FormControl sx={{width: "300px", marginBottom: 1}}>
              
              <TextField
              select
              label = "Account"
              value= {accountId}
              onChange={handleChangeAccounts}
              >
                {accounts.map((account) => (<MenuItem key={account._id} value = {account._id}>{account._id}</MenuItem>))}
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
           <Box sx={{ marginBottom: 1}}>
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
              <TextField
              label ="currency"
              select
              id="currency"
              name="currency"
              value={accountData.currency}
              onChange={handleCurrency}
              required
              >
                <MenuItem value = "SGD" >SGD</MenuItem>
              </TextField>
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
             onClick={handleWithdraw}
           >
             Withdraw
           </Button>
         </Paper>
        </Box>
     )}


