import { useState, useEffect } from "react";
import WalletConnect from "./WalletConnect";
import DIDForm from "./DIDForm";

function App() {
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      alert("❌ MetaMask가 설치되어 있지 않습니다. 설치 후 다시 시도해주세요!");
    } else {
      setHasMetaMask(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">MetaMask 확인</h1>

      {hasMetaMask ? (
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
      )}
    </div>
  );
}

export default App;
