const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const user = JSON.parse(atob(token.split('.')[1]));
  return user;
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    localStorage.setItem('token', json.token);
    return json;
  } catch (err) {
    throw new Error(err);
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      localStorage.setItem('token', json.token);
      const user = JSON.parse(atob(json.token.split('.')[1]));
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createAccount = async (accountData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/account/create`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json', 
       },
      body: JSON.stringify(accountData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json; 
  } catch (err) {
    throw new Error(err);
  }
};

const signout = () => {
  localStorage.removeItem('token');
};

export { signup, signin, getUser, signout, createAccount };