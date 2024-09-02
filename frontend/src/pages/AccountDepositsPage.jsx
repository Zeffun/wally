import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as authService from '../services/authService';



export default function AccountDepositsPage({accountId}) {
  const navigate = useNavigate()
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: '',
    balance: 0,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({ ...accountData, [name]: value })
  };

  const handleDeposit = async (event) => {
    console.log(accountId)
    event.preventDefault();
    try {
      const newUserResponse = await authService.depositAccount(accountData, accountId);
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
            <Box sx={{ marginBottom: 1 }}>
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
           </Box>
           <Box sx={{ marginBottom: 1 }}>
             <TextField
               id="currency"
               label="currency"
               fullWidth
               margin="dense"
               variant="outlined"
               name="currency"
               value={accountData.currency}
               onChange={handleChange}
               required
             />
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


