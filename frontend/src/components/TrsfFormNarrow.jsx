import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function TrsfFormNarrow({
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
        px: { xs: 2, sm: 3, md: 0 }, // Padding for mobile
      }}
      noValidate
      autoComplete="off"
    >
      {/* Grid Container for each row */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Label on the left */}
        <Grid item xs={6}>
          <Box>Send it to:</Box>
        </Grid>
        {/* TextField on the right */}
        <Grid item xs={6}>
          <TextField
            id="controlled acnum"
            label={recName}
            name="receiverAcc"
            value={transferData.receiverAcc}
            sx={boxShadowStyle}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        sx={{ width: "100%", mt: 3 }}
      >
        <Grid item>
          <Button onClick={handleCheckName}>check name</Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Label on the left */}
        <Grid item xs={6}>
          <Box>Send from:</Box>
        </Grid>
        {/* TextField on the right */}
        <Grid item xs={6}>
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
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Label on the left */}
        <Grid item xs={6}>
          <Box>Currency:</Box>
        </Grid>
        {/* TextField on the right */}
        <Grid item xs={6}>
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
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Label on the left */}
        <Grid item xs={6}>
          <Box>Amount:</Box>
        </Grid>
        {/* TextField on the right */}
        <Grid item xs={6}>
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
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Label on the left */}
        <Grid item xs={6}>
          <Box>Purpose:</Box>
        </Grid>
        {/* TextField on the right */}
        <Grid item xs={6}>
          <TextField
            id="Purpose"
            label="Purpose of transfer"
            variant="filled"
            name="purpose"
            sx={boxShadowStyle}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Button at the right */}
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        sx={{ width: "100%", mt: 3 }}
      >
        <Grid item>
          <Button
            sx={boxShadowStyle}
            variant="contained"
            onClick={handleSubmit}
          >
            Send now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
