import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as authService from '../services/authService';







export default function AccountDepositsPage(){
   
    const accountId = "66d459c4c259e9b5fa605728"
    const [deposit, setDeposit] = useState({
        acId: "",
        dateCreated: "",
        currency: "",
        balance: 0
    })
    
    // const { accountId } = useParams()
    
    useEffect(() => {
        const handleDeposit = async() => {
            const url = `api/deposit/${accountId}`;
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

        
        const url = `api/deposit/${accountId}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(deposit),
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsb3kiLCJfaWQiOiI2NmQ0NTkwM2MyNTllOWI1ZmE2MDU3MjIiLCJpYXQiOjE3MjUxOTI5MDcsImV4cCI6MTc2MTE5MjkwN30.hV7fU5FOLPBDUL-GUXO8pupne7sjfI6ayx-6NH6A6e8",
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
              id="dateCreated"
              label="dateCreated"
              fullWidth
              margin="dense"
              variant="outlined"  
              name="dateCreated"
              value={deposit.dateCreated}
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


