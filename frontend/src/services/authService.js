const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));
  return user;
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem("token", json.token);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      localStorage.setItem("token", json.token);
      const user = JSON.parse(atob(json.token.split(".")[1]));
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createAccount = async (accountData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/accounts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    const accountId = json.accountId;
    return accountId;
  } catch (err) {
    throw new Error(err);
  }
};

const getAccounts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/accounts/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    const accounts = json;
    return accounts;
  } catch (err) {
    throw new Error(err);
  }
};

const getAccountById = async ({ accountId }) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/accounts/${accountId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Account not found or server error: ${res.status}`);
    }

    const json = await res.json();
    if (!json || !json.acId) {
      throw new Error("No account found with the provided ID");
    }

    return json;
  } catch (err) {
    throw new Error(err.message);
  }
};

const depositAccount = async (depositData, accountId) => {
  const url = `${BACKEND_URL}/api/updates/deposit/${accountId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(depositData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const withdrawAccount = async (withdrawData, accountId) => {
  const url = `${BACKEND_URL}/api/updates/withdraw/${accountId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(withdrawData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const updateTransaction = async (depositTransaction, accountId) => {
  const url = `${BACKEND_URL}/api/updates/transactions/${accountId}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(depositTransaction),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const signout = () => {
  localStorage.removeItem("token");
};

export {
  signup,
  signin,
  getUser,
  signout,
  createAccount,
  getAccounts,
  getAccountById,
  depositAccount,
  withdrawAccount,
  updateTransaction,
};
