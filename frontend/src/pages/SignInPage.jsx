import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';


export default function SignInPage(props){
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/account/main');
    } catch (err) {
      updateMessage(err.message);
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
          <p>{message}</p>
           <Box sx={{ marginBottom: 3 }}>
             <TextField
              id="username"
              label="Username"
              fullWidth
              margin="dense"
              variant="outlined"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
             />
           </Box>
           <Box sx={{ marginBottom: 3 }}>
             <TextField
               id="password"
               label="Password"
               fullWidth
               margin="dense"
               variant="outlined"
               type="password"
               value={formData.password}
               name="password"
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
             onClick={handleSubmit}
           >
             Sign In
           </Button>
         </Paper>
        </Box>
     )}