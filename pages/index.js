import CMCTable from "../components/cmc-table/CMCTable";
import Header from "../components/Header";
import SwapCryptoModal from "../components/SwapCryptoModal";
import Trending from "../components/Trending";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <SwapCryptoModal />
      <div className="mt-10">
        <Trending />
      </div>
      <div className="mt-20">
        <CMCTable />
      </div>
    </div>
  );
};

export default Home;
