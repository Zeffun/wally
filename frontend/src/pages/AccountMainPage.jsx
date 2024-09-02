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

  <ul>
  {accounts.map((account, index) => (<li key={index}>{account.balance}</li>))}
  </ul>
  
  
  
  
  </>)
}