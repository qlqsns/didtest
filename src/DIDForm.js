import React, { useState, useEffect } from "react";
import { authenticate } from "./authenticate"; // 인증 관련 함수 임포트

function DIDForm({ account }) {
  const [didDocument, setDidDocument] = useState(null); // DID 문서 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isValidSignature, setIsValidSignature] = useState(null); // 서명 검증 상태
  const [message, setMessage] = useState(""); // 서명할 메시지
  const [signature, setSignature] = useState(""); // 서명

  useEffect(() => {
    if (account) {
      const did = `did:ethr:${account}`; // 지갑 주소를 기반으로 DID 생성
      setLoading(true);

    //DID 예시 문서임 실제로는 블록체인에 기록되어야함. 
    // 테스트를 위해, 1,2,3,4 번에 자신의 주소지갑 입력! 3,4번 같은 경우 뒤에 #key-1 입력
      const exampleDIDDocuments = {
        "did:ethr:0xd1ec335528e540e0d14e74d206df85740736e950": { // 1
          id: "did:ethr:0xd1ec335528e540e0d14e74d206df85740736e950", // 2
          publicKey: [
            {
              id: "did:ethr:d1ec335528e540e0d14e74d206df85740736e950#key-1", //3
              type: "Secp256k1VerificationKey2018",
            },
          ],
          authentication: [
            {
              type: "Secp256k1SignatureAuthentication2018",
              publicKey: "did:ethr:d1ec335528e540e0d14e74d206df85740736e950#key-1", //4
            },
          ],
        },
      };

      console.log("Requested DID:", did);
      console.log("DID Document:", exampleDIDDocuments[did]);

      const document = exampleDIDDocuments[did];

      if (document) {
        console.log("Found DID Document:", document);
        setDidDocument(document);
      } else {
        console.log("DID Document not found for:", did);
        setDidDocument(null);
      }

      setLoading(false);
    }
  }, [account]);

  const handleAuthentication = async () => {
    if (didDocument) {
      // authenticate.js 호출 부분
      const isValid = await authenticate(
        didDocument,
        setMessage,
        setSignature,
        setIsValidSignature 
      );
      setIsValidSignature(isValid);
    }
  };

  return (
    <div className="mt-4">
      {loading ? (
        <p className="text-blue-600">DID 문서 조회 중...</p>
      ) : didDocument ? (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <h3 className="font-bold mb-2">DID 문서</h3>
          <pre className="text-sm">{JSON.stringify(didDocument, null, 2)}</pre>
        </div>
      ) : (
        <p className="text-red-600 mt-4">❌ 해당 DID 문서가 없습니다. DID 발급 안됨.</p>
      )}

      <button
        onClick={handleAuthentication}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        신원 인증하기
      </button>

      {isValidSignature !== null && (
        <div className="mt-4">
          <h3 className="font-bold">서명 검증 결과</h3>
          <p>{isValidSignature ? "✅ 서명이 유효합니다." : "❌ 서명이 유효하지 않습니다."}</p>
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-bold">검증 단계 정보</h3>
        <p><strong>서명할 메시지:</strong> {message}</p>
        <p><strong>서명:</strong> {signature}</p>
      </div>
    </div>
  );
}

export default DIDForm;
