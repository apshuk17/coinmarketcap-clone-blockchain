import { createContext, useContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import {
  daiAbi,
  linkAbi,
  usdcAbi,
  dogeAbi,
  daiAddress,
  dogeCoinAddress,
  linkAddress,
  usdcAddress,
} from "../lib/constants";

const CoinMarketContext = createContext();

export const CoinMarketProvider = ({ children }) => {
  const { isAuthenticated, Moralis, user } = useMoralis();
  const { data: coins, error, isLoading: loadingCoins } = useMoralisQuery("Coins");

  const [currentAccount, setCurrentAccount] = useState("");
  const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState(false);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const userAccount = user.get("ethAddress");
      setCurrentAccount(userAccount);
    }
  }, [isAuthenticated, user]);

  const getContractAddress = (token) => {
    switch (token) {
      case "Dai":
        return daiAddress;
      case "Dogecoin":
        return dogeCoinAddress;
      case "Link":
        return linkAddress;
      case "Usdc":
        return usdcAddress;
      default:
        return "";
    }
  };

  const getContractAbi = (token) => {
    switch (token) {
      case "Dai":
        return daiAbi;
      case "Dogecoin":
        return dogeAbi;
      case "Link":
        return linkAbi;
      case "Usdc":
        return usdcAbi;
      default:
        return "";
    }
  };

  const getTopTenCoins = async () => {
    try {
      const res = await fetch("/api/getTopTen");
      const data = await res.json();
      return data.data.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const sendEth = async () => {
    if (!isAuthenticated) return;
    const contractAddress = getContractAddress(toToken);

    let options = {
      type: "native",
      amount: Moralis.Units.ETH("0.001"),
      receiver: contractAddress,
    };

    const transaction = await Moralis.transfer(options);
    const receipt = await transaction.wait();
    console.log("##receipt sendEth", receipt);
  };

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return;
      await Moralis.enableWeb3();

      if (fromToken === toToken)
        return alert("You cannot swap the same token!");
      const fromOptions = {
        type: "erc20",
        amount: Moralis.Units.Token(amount, "18"),
        receiver: getContractAddress(fromToken),
        contractAddress: getContractAddress(fromToken),
      };

      const toMintOptions = {
        contractAddress: getContractAddress(toToken),
        functionName: "mint",
        abi: getContractAbi(toToken),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, "18"),
        },
      };

      const fromTransaction = await Moralis.transfer(fromOptions);
      const toMintTransaction = await Moralis.executeFunction(toMintOptions);
      const fromReceipt = await fromTransaction.wait();
      const toReceipt = await toMintTransaction.wait();

      console.log("##fromTransReceipt SWAP", fromReceipt);
      console.log("##toTransReceipt SWAP", toReceipt);
    } catch (err) {}
  };

  const mint = async () => {
    try {
      if (fromToken === "ETH") {
        // Eth to Token transfer
        if (!isAuthenticated) return;
        await Moralis.enableWeb3();
        // Get the toToken contract address and abi
        const contractAddress = getContractAddress(toToken);
        const contractAbi = getContractAbi(toToken);
        console.log('##from-to', fromToken, toToken);
        console.log('##contractAddress', contractAddress);
        console.log('##contractAbi', contractAbi);

        let options = {
          contractAddress,
          functionName: "mint",
          abi: contractAbi,
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token(amount),
          },
        };

        sendEth();
        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        console.log("##receipt Mint", receipt);
      } else {
        // Token to token transfer
        swapTokens();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setOpenBuyCryptoModal(true);
  };

  return (
    <CoinMarketContext.Provider
      value={{
        getTopTenCoins,
        openBuyCryptoModal,
        setOpenBuyCryptoModal,
        coins,
        loadingCoins,
        fromToken,
        toToken,
        setFromToken,
        setToToken,
        amount,
        setAmount,
        mint,
        openModal,
      }}
    >
      {children}
    </CoinMarketContext.Provider>
  );
};

export const useCoinMarketContext = () => {
  return useContext(CoinMarketContext);
};
