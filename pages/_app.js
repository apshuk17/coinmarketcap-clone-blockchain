import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { CoinMarketProvider } from "../context/context";
// import { GunProvider } from "../context/gunContext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_SERVER}
      appId={process.env.NEXT_PUBLIC_APP_ID}
    >
      <CoinMarketProvider>
        <Component {...pageProps} />
      </CoinMarketProvider>
    </MoralisProvider>
  );
}

export default MyApp;
