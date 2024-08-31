import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, Typography } from '@mui/material';






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
          <Box sx={{ marginBottom: 4 }}>
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
            Your particulars will only be visible to wally =) 
          </Typography>
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