import React, { useState, useEffect, useCallback } from "react";
import { useCoinMarketContext } from "../../context/context";
import CMCTableHeader from "./CMCTableHeader";
import CMCTableRow from "./CMCTableRow";
import btc from "../../assets/btc.png";

const CMCTable = () => {
  const { getTopTenCoins } = useCoinMarketContext();
  const [coinMarketData, setCoinMarketData] = useState(null);

  const setData = useCallback(async () => {
    try {
      const apiResponse = await getTopTenCoins();
      const filteredResponse = [];

      apiResponse.forEach((item) => {
        if (item.cmc_rank <= 10) filteredResponse.push(item);
      });

      setCoinMarketData(filteredResponse);
    } catch (err) {
      console.error(err);
    }
  }, [getTopTenCoins]);

  useEffect(() => {
    setData();
  }, [setData]);

  console.log("##coinMarketData", coinMarketData);

  return (
    <div className="text-white font-bold">
      <div className="mx-auto max-w-screen-2xl">
        <table className="w-full">
          <CMCTableHeader />

          {coinMarketData && coinMarketData ? (
            coinMarketData.map((coin, index) => {
              return (
                <CMCTableRow
                  key={index}
                  starNum={coin.cmc_rank}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  coinIcon={btc}
                  showBuy={true}
                  hRate={coin.quote.USD.percent_change_24h}
                  dRate={coin.quote.USD.percent_change_7d}
                  hRateIsIncrement={true}
                  price={coin.quote.USD.price}
                  marketCapValue={coin.quote.USD.market_cap}
                  volumeCryptoValue={coin.quote.USD.volume_24h}
                  volumeValue={coin.total_supply}
                  circulatingSupply={coin.circulating_supply}
                />
              );
            })
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  );
};

export default CMCTable;
