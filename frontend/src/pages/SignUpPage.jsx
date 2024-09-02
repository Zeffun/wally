import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper, Button, Typography } from '@mui/material';
import { useState } from 'react';
import * as authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });
   
  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      console.log(newUserResponse);
      navigate('/account/main');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
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
          <Box sx={{ marginBottom: 5 }}>
            <TextField
              id="username"
              label="Username"
              fullWidth
              margin="dense"
              variant="outlined"
              name="username"
              value={username}
              onChange={handleChange}
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
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="confirm"
              label="Confirm Password"
              fullWidth
              margin="dense"
              variant="outlined"
              type="password"
              name="passwordConf"
              value={passwordConf}
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
            disabled={isFormInvalid()}
          >
            Sign Up
          </Button>
        </Paper>
       </Box>
    )}