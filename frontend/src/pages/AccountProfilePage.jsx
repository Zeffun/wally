import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as authService from "../services/authService";



export default function AccountProfilePage(){
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const [userAuth, setuserAuth] = useState({username: ""})
    const [conText, setConText] = useState({
        master: "I agree to delete all accounts and my user from Wally",
        user: ""
    })

    const handleDeleteAuth = (event) => {
        const { name, value } = event.target;
        setuserAuth({ ...userAuth, [name]: value });
    };

    const handleConfirmationText = (event) => {
        const { name, value } = event.target;
        setConText({ ...conText, [name]: value });
    }
    
    const handleDelete = async (event) => {
        event.preventDefault();    
        try {
            const newTransactionResponse = await authService.deleteUser(userAuth);
            navigate("/");
            console.log(newTransactionResponse)
        } catch (err) {
            console.error(err.message);
            setError(true)
        } 
    };

    const deleteButton = () => {return !(conText.master === conText.user)}
    
    return (
        <Box
        component="form"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Paper sx={{ m: 1 }}>
            <TextField
              id="amount"
              label="New Password"
              fullWidth
              margin="dense"
              variant="outlined"
              name="balance"
              required
            />
            <Button>
                Change Password
            </Button>
        </Paper>
        <Paper sx={{ m: 1 }}>
            <TextField
                id="username"
                label="Username"
                fullWidth
                margin="dense"
                variant="outlined"
                name="username"
                required
                error={error}
                helperText={error ? "WRONG USER" : ""}
                onChange={handleDeleteAuth}
            />
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 1 }}
                >
                Please key in the text "I agree to delete all accounts and my user from Wally"
            </Typography>
            <TextField
              id="text"
              label="Confirmation Text"
              fullWidth
              margin="dense"
              variant="outlined"
              value={conText.user}
              name="user"
              required
              onChange={handleConfirmationText}
            />
            <Button
            onClick={handleDelete}
            disabled = {deleteButton()}
            >
                Delete Account
            </Button>
        </Paper>
      </Box>
    

)
}