import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  useTheme,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import TrsfFormWide from "../components/TrsfFormWide";
import { newTransfer } from "../services/transfService";
import { getAccountById, getAccounts } from "../services/authService";
import TrsfFormNarrow from "../components/TrsfFormNarrow";

// import Stack from "@mui/material/Stack";
const currencies = [
  {
    value: "SGD",
    label: "SGD",
  },
];

const boxShadowStyle = {
  boxShadow: "-4px 4px 6px rgba(0, 0, 0, 0.1)",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: (theme) => theme.palette.primary.main,
    },
  },
};
export default function AccountTransfersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [recName, setRecName] = useState("Receipient account no.");
  const [error, setError] = useState(null);
  const [transferData, setTransferData] = useState({
    senderAcc: "",
    receiverAcc: "",
    currency: "SGD",
    amount: 0,
    purpose: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransferData({ ...transferData, [name]: value });
  };
  const handleChangeAmt = (event) => {
    const amountRegex = /^\d*\.?\d{0,2}$/;
    const value = event.target.value;
    if (value === "") {
      setTransferData({ ...transferData, amount: value });
      setError(null);
      return;
    }
    if (amountRegex.test(value)) {
      setTransferData({ ...transferData, amount: value });
      setError(null);
    } else {
      setError("Invalid amount");
    }
  };
  const handleCheckName = async (event) => {
    event.preventDefault();
    try {
      // Extract receiverAcc from transferData
      const { receiverAcc } = transferData;
      // Call getAccountById with receiverAcc as a parameter
      const checkNameResponse = await getAccountById({
        accountId: receiverAcc,
      });
      const { acId } = checkNameResponse;
      setRecName(acId);
    } catch (err) {
      console.error(err.message);
      setRecName("No account found");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const amount = parseFloat(transferData.amount);
      const newTransferResponse = await newTransfer({
        ...transferData,
        amount,
      });
      console.log(newTransferResponse);
      navigate("/account/main");
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadAccount = async () => {
      const data = await getAccounts();
      setAccounts(data);
    };
    loadAccount();
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isMobile ? (
        <TrsfFormNarrow
          recName={recName}
          transferData={transferData}
          boxShadowStyle={boxShadowStyle}
          handleChange={handleChange}
          accounts={accounts}
          MenuItem={MenuItem}
          currencies={currencies}
          handleChangeAmt={handleChangeAmt}
          error={error}
          handleSubmit={handleSubmit}
          handleCheckName={handleCheckName}
        />
      ) : (
        <TrsfFormWide
          recName={recName}
          transferData={transferData}
          boxShadowStyle={boxShadowStyle}
          handleChange={handleChange}
          accounts={accounts}
          MenuItem={MenuItem}
          currencies={currencies}
          handleChangeAmt={handleChangeAmt}
          error={error}
          handleSubmit={handleSubmit}
          handleCheckName={handleCheckName}
        />
      )}
      ;
    </>
  );
}
