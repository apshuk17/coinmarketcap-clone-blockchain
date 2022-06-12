import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import CoinDetail from "../../components/CoinDetail";

const Price = () => {
  const [coinName, setCoinName] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [coinPrice, setCoinPrice] = useState("");

  const router = useRouter();
  const { coin, symbol, price } = router.query;
  console.log("##query", coin, symbol, price);

  useEffect(() => {
    setCoinName(coin);
  }, [coin]);

  useEffect(() => {
    setCoinPrice(price);
  }, [price]);

  useEffect(() => {
    setCoinSymbol(symbol);
  }, [symbol]);

  return (
    <div>
      <Header />
      <CoinDetail
        coinName={coinName}
        coinSymbol={coinSymbol}
        price={coinPrice}
      />
    </div>
  );
};

export default Price;
