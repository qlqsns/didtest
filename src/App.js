import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes , useNavigate} from "react-router-dom";
import IdentityVerification from "./IdentityVerification";
import WalletConnect from "./WalletConnect";
import DIDForm from "./DIDForm";
import bgImage from './assets/bg.jpg';
import './App.css';

function App() {
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      alert("❌ MetaMask가 설치되어 있지 않습니다. 설치 후 다시 시도해주세요!");
    } else {
      setHasMetaMask(true);
    }
  }, []);

  useEffect(() => {
    if (!account) {
      navigate("/"); // account가 없을 경우 홈으로 리디렉션
    }
  }, [account, navigate]); // account 상태가 바뀔 때마다 실행
  return (
    <div className="App"> 
      <h1 className="eswn">ESWN</h1>

        <Routes>
          <Route path="/" element={
            hasMetaMask ? (
              account ? (
                <>
                  <p className="text-green-600">✅ 연결된 지갑: {account}</p>
                  <DIDForm account={account} />
                </>
              ) : (
                <WalletConnect setAccount={setAccount} />
              )
            ) : (
              <div className="text-red-600">
                ❌ MetaMask가 설치되어 있지 않습니다.
                <br />
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  MetaMask 다운로드
                </a>
              </div>
            )
          } />
          <Route path="/identity-verification" element={<IdentityVerification />} />
        </Routes>
    </div>
  );
}

export default App;
