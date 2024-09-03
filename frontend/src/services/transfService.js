const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const newTransfer = async (transfer) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/transaction/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transfer),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { newTransfer };
