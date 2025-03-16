import React from "react";

function WalletConnect({ setAccount }) {
  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("❌ MetaMask가 설치되어 있지 않습니다. 설치 후 다시 시도해주세요!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]); // 첫 번째 지갑 주소 저장
    } catch (error) {
      console.error("지갑 연결 실패:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      MetaMask 지갑 연결하기
    </button>
  );
}

export default WalletConnect;
