import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function TrsfFormWide({
  recName,
  transferData,
  boxShadowStyle,
  handleChange,
  accounts,
  MenuItem,
  currencies,
  handleChangeAmt,
  error,
  handleSubmit,
  handleCheckName,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "35ch" }, // TextField margin and width
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100vh",
        paddingTop: "64px",
      }}
      noValidate
      autoComplete="off"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Send it to : </Box>{" "}
        <TextField
          id="controlled acnum"
          label={recName}
          name="receiverAcc"
          value={transferData.receiverAcc}
          sx={boxShadowStyle}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align button to the right
          width: "100%", // Full width
          maxWidth: "400px", // Limit the width of the main container
          mt: 0.25, // Add some spacing above the button
        }}
      >
        <Button onClick={handleCheckName}>Check receipient</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>Send from:</Box> {/* Label on the left */}
        <TextField
          id="senderAcc"
          select
          label="Please select sending account"
          helperText=""
          value={transferData.senderAcc}
          name="senderAcc"
          sx={boxShadowStyle}
          onChange={handleChange}
        >
          {accounts.map((account) => (
            <MenuItem key={account._id} value={account._id}>
              {account._id}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        sx={{
          width: "46ch",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>Currency</Box> {/* Label on the left */}
        <TextField
          id="currency"
          select
          label="Select currency"
          defaultValue="S$"
          helperText=""
          value={transferData.currency}
          name="currency"
          sx={boxShadowStyle}
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ marginRight: 2 }}>Amt:</Box> {/* Label on the left */}
        <TextField
          id="amt"
          label=""
          value={transferData.amount}
          name="amount"
          sx={boxShadowStyle}
          onChange={handleChangeAmt}
          error={error}
          helperText={error}
        />
      </Box>
      <Box
        sx={{
          width: "46ch",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>Purpose:</Box> {/* Label on the left */}
        <TextField
          id="Purpose"
          label="Purpose of transfer"
          variant="filled"
          name="purpose"
          sx={boxShadowStyle}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align button to the right
          width: "100%", // Full width
          maxWidth: "400px", // Limit the width of the main container
          mt: 3, // Add some spacing above the button
        }}
      >
        <Button sx={boxShadowStyle} variant="contained" onClick={handleSubmit}>
          Send now
        </Button>
      </Box>
    </Box>
  );
}
