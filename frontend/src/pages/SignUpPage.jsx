import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';






export default function SignUpPage(){
   
   
   
   
   
   
   
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
          <Box sx={{ marginBottom: 5 }}>
            <TextField
              id="username"
              label="Username"
              fullWidth
              margin="dense"
              variant="outlined"
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="password"
              label="Password"
              fullWidth
              margin="dense"
              variant="outlined"
              type="password"
              required
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Paper>
       </Box>
    )}