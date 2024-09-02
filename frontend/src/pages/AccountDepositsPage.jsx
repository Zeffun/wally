import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as authService from '../services/authService';
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;






export default function AccountDepositsPage(){
   
    const accountId = "66d53bfe24f856a49697a882"
    const [deposit, setDeposit] = useState({
        acId: "",
        currency: "",
        balance: 0
    })
    
    // const { accountId } = useParams()
    
    useEffect(() => {
        const handleDeposit = async() => {
            const url = `${BACKEND_URL}/api/deposit/${accountId}`;
            try {
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                setDeposit(json);
            } catch(error) {
                console.error(error.message)
            }
        }
        handleDeposit()
    }, [accountId])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeposit({...deposit, [name]: value})
    }

    const handleUpdate = async(event) => {
        event.preventDefault()

        
        const url = `${BACKEND_URL}api/deposit/${accountId}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(deposit),
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsb3kiLCJfaWQiOiI2NmQ1MmI2MTRjNDc0MDFmYTE5MDUxZmQiLCJpYXQiOjE3MjUyNTAxMzYsImV4cCI6MTc2MTI1MDEzNn0.GipbrzR4Hy0z_awjvRlrDfRK0YdAntqFln038rvTsKA",
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setDeposit(json);
        } catch(error) {
                console.error(error.message)
        }
    }
  
    
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
              value={deposit.acId}
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
               value={deposit.currency}
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
               value={deposit.balance}
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
             onClick={handleUpdate}
           >
             Deposit
           </Button>
         </Paper>
        </Box>
     )}


