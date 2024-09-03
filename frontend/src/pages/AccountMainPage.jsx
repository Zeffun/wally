import { getAccounts } from "../services/authService"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import * as React from 'react';

export default function AccountMainPage(){

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
    };
    loadAccount();
  }, [])

  
  return(<>

  
<Box
  component="section"
  sx={{
    p: 2,
    display: { xs: "flex", md: "flex" },
    width: '80%',
    height: '20vh', 
    margin: '0 auto', 
    justifyContent: { xs: 'space-around', md: 'space-around'},
    alignItems: 'center',
    flexWrap: 'wrap',
    boxShadow: 3, 
    marginTop: "20px"
  }}
>
  {accounts.map((account, index) => (
    <Card
      key={index}
      sx={{
        width: {xs: '50px', md: '200px'}, 
        height: {xs: '50px', md: '100px'}, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: { xs: 2, md: 0},
        backgroundColor: "#f3e9e7",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
           Account
        </Typography>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {account._id}
        </Typography>
        <Typography variant="h5" component="div">
          ${account.balance}
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>
    <Box
      sx={{
        p: 2,
        display: { xs: "flex", md: "flex" },
        width: '80%',
        height: '20vh',
        margin: '0 auto',
        justifyContent: { xs: 'space-around', md: 'space-around' },
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: 3,
        marginTop: "20px"
    >
<Button variant="outlined" ></Button>
</Box>

 
  
  
  
  
  </>)
}