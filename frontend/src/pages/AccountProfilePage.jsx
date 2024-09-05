import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import * as authService from "../services/authService";

export default function AccountProfilePage({ handleSignout }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userAuth, setuserAuth] = useState({ username: "" });
  const [conText, setConText] = useState({
    master: "I agree to delete all accounts and my user from Wally",
    user: "",
  });
  const [newPassword, setNewPassWord] = useState({ password: "" });
  const [passwordIndicator, setPasswordIndicator] = useState(false);

  const handleDeleteAuth = (event) => {
    const { name, value } = event.target;
    setuserAuth({ ...userAuth, [name]: value });
  };

  const handleConfirmationText = (event) => {
    const { name, value } = event.target;
    setConText({ ...conText, [name]: value });
  };

  const handleNewPassword = (event) => {
    const { name, value } = event.target;
    setNewPassWord({ ...newPassword, [name]: value });
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const newTransactionResponse = await authService.deleteUser(userAuth);
      handleSignout();
      navigate("/");
      console.log(newTransactionResponse);
    } catch (err) {
      console.error(err.message);
      setError(true);
    }
  };

  const deleteButtonDisabled = () => {
    return !(conText.master === conText.user);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const passswordChangeResponse = await authService.changePassword(
        newPassword
      );
      console.log(passswordChangeResponse);
      setPasswordIndicator(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container
      sx={{
        display: { xs: "block", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          m: 3,
          display: "flex",
          flexDirection: "column",
          height: { xs: "auto", md: "300px" },
          width: { xs: "auto", md: "35%" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="password"
          label="New Password"
          margin="dense"
          variant="outlined"
          name="password"
          type="password"
          onChange={handleNewPassword}
          helperText={
            passwordIndicator
              ? "Password Changed, please remember your password"
              : ""
          }
          required
          sx={{ width: "80%" }}
        />
        <Button
          onClick={handleChangePassword}
          sx={{ m: 2 }}
          variant="outlined"
          startIcon={<KeyIcon />}
        >
          Change Password
        </Button>
      </Card>
      <Card
        sx={{
          m: 3,
          display: "flex",
          flexDirection: "column",
          height: { xs: "auto", md: "300px" },
          width: { xs: "auto", md: "35%" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="username"
          label="Username"
          margin="dense"
          variant="outlined"
          name="username"
          required
          error={error}
          helperText={error ? "WRONG USER" : ""}
          onChange={handleDeleteAuth}
          sx={{ width: "80%" }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ m: 1, textAlign: "center" }}
        >
          Please key in the text "I agree to delete all accounts and my user
          from Wally"
        </Typography>
        <TextField
          id="text"
          label="Confirmation Text"
          margin="dense"
          variant="outlined"
          value={conText.user}
          name="user"
          required
          onChange={handleConfirmationText}
          sx={{ width: "80%" }}
        />
        <Button
          onClick={handleDelete}
          disabled={deleteButtonDisabled()}
          sx={{ m: 2 }}
          variant="outlined"
          endIcon={<DeleteIcon />}
        >
          Delete Account
        </Button>
      </Card>
    </Container>
  );
}
