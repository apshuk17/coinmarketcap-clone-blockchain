// bcf0e5c8-df03-4ef6-8bd0-5348f0be1e15

export default function handler(req, res) {
  const getData = async () => {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.NEXT_BACKEND_CMC_API_KEY}`,
      {
        method: "Get",
        headers: {
          Accept: "*/*",
        },
      }
    );

    const data = await response.json();

    res.status(200).json({ data });
  };

  getData();
}
