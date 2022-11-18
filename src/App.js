import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);

  const getNft = (_account) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.opensea.io/api/v1/collections?asset_owner=${_account}offset=0&limit=20`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
         console.log(response)
        })
      .catch((err) => console.error(err));
  };

  const metaConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0]);
    getNft(res[0]);
  };

  return (
    <div className="App">
      <p>{account}</p>
      <button onClick={metaConnect}>Connect</button>
      <button onClick={getNft}>Get NFT Data</button>
    </div>
  );
}

export default App;
