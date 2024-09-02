import { getAccounts } from "../services/authService"
import { useState, useEffect } from "react";

export default function AccountMainPage(){

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
      console.log(data)

    };
    loadAccount();
  }, [])

  
  
  return(<>
  
  <h1>MainPage</h1>
  
  
  </>)
}