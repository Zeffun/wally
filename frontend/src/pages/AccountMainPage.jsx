import { getAccounts } from "../services/authService"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";

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
    height: '100vh', 
    margin: '0 auto', 
    justifyContent: { xs: 'space-around', md: 'space-around'},
    flexWrap: 'wrap',
    boxShadow: 3, 
  }}
>
  {accounts.map((account, index) => (
    <Paper
      key={index}
      sx={{
        width: {xs: '50px', md: '200px'}, 
        height: {xs: '50px', md: '100px'}, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: { xs: 2, md: 0}
      }}
    >
      {account.balance}
    </Paper>
  ))}

  
</Box>

 
  
  
  
  
  </>)
}