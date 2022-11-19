import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [data, setData] = useState("");
 
  console.log(data);

 


  const getNft = (_account) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    
      fetch("https://api.opensea.io/api/v1/asset/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1/?include_orders=false", options)
    
      .then((response) => response.json())
      .then((response) => {
        setData(response.id);
         console.log(response)
        })
      .catch((err) => console.error(err));
  };

  const metaConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0]);
    getNft(res);
  };

  return (
    <div className="App">
      <p>{account}</p>
      <button onClick={metaConnect}>Connect</button>
      {/* <button onClick={getNft}>Get NFT Data</button> */}
      
      {Object.entries(data).map(([key, val], i) => {
        return (
          
            <p key={i}>
             {key} : {val}
            </p>
          
        )
      })}
    </div>
  );
}

export default App;
