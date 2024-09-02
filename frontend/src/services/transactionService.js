const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// Get Transaction History for the current user
const getTransactionHistory = async () => { 
      try {
        const res = await fetch(`${BACKEND_URL}/api/transaction/history`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }
};

export { getTransactionHistory };

