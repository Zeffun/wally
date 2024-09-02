import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const accounts = [
  {
    value: "100000000011231231231231231",
    label: "100000000011231231231231231",
  },
  {
    value: "123",
    label: "No.",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
export default function AccountTransfersPage() {
  const [acnum, setAcnum] = useState("Receipient Account");
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "35ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        height: "100vh",
        paddingRight: 80,
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
        <Box sx={{ marginRight: 2 }}>Send to:</Box> {/* Label on the left */}
        <TextField
          id="controlled acnum"
          label="Receipient account no."
          value={acnum}
          onChange={(event) => {
            setAcnum(event.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>Send from:</Box> {/* Label on the left */}
        <TextField
          id="outlined-select-currency"
          select
          label="Please select sending account"
          defaultValue="123"
          helperText=""
        >
          {accounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
