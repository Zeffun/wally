import { getAccounts } from "../services/authService"
import { useState, useEffect } from "react";

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
  <h1>Accounts</h1>
  <ul>
    {accounts.map((account, index) => (
      <>
      <br></br>
      <li key={index}>Account: {account.acId} | Balance: {account.currency} {account.balance}</li>
      </>
    ))}
  </ul>
  
  
  
  
  </>)
}