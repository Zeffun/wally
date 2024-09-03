const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Get Transaction History for the current user
const getTransactionHistory = async () => { 
      try {
        const res = await fetch(`${BACKEND_URL}/api/transaction/history`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        const json = await res.json();
        if (json.error) {
          throw new Error(json.error);
        }
        const transactions = json
        return transactions; 
      } catch (error) {
        console.log(error);
      }
};

const getUpdatesHistory = async () => { 
  try {
    const res = await fetch(`${BACKEND_URL}/api/updates/transactions`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    const updates = json
    return updates; 
  } catch (error) {
    console.log(error);
  }
};

export { getTransactionHistory, getUpdatesHistory };

