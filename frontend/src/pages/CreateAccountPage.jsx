import { Box, Paper, Typography, Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import * as authService from '../services/authService';
import { useNavigate } from 'react-router-dom';




export default function CreateAccountPage({ setAccountId}){
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    acId: 0,
    currency: '',
    balance: 0,
  });
   
 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData({...accountData, [name]: value})
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAccountResponse = await authService.createAccount(accountData);
      console.log(newAccountResponse);
      setAccountId(newAccountResponse)
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
          <p>createAccount</p>
          <Box sx={{ marginBottom: 5 }}>
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
          <Box sx={{ marginBottom: 2 }}>
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
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="balance"
              label="balance"
              fullWidth
              margin="dense"
              variant="outlined"
              name="balance"
              value={accountData.balance}
              onChange={handleChange}
              required
            />
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            By signing up, you agree to wally terms and conditions. 
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            Your particulars will only be visible to wally 
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Paper>
       </Box>
    )}


    



   