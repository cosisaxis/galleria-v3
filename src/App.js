import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [newData, setNewData] = useState([]);
 
  console.log(newData); 

 


  const getNft = (_account) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    
      fetch("https://api.opensea.io/api/v1/asset_contract/0x06012c8cf97bead5deae237070f9587f8e7a266d", options)
    
      .then((response) => response.json())
      .then((response) => {
        setNewData(response.collection);
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
      {/* {Object.keys(newData).map((key) => (
        <div> 
          <h3>{key}:{newData}</h3>
        </div>
      
      ))} */}
      <div>
        <h4>{JSON.stringify(newData.name)}</h4>
        <h4>{JSON.stringify(newData.description)}</h4>
      </div>
     
    </div>
  );
}

export default App;
