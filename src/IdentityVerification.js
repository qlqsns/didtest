import React, { useState } from "react";
import "./IdentityVerification.css";

function IdentityVerification() {
  const [school, setSchool] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 입력된 데이터를 처리 (예: 서버로 전송, 검증 등)
    alert(`학교: ${school}, 학번: ${studentId}, 이름: ${name}, 나이: ${age}`);
    // 실제로 신원 인증 후 페이지를 이동시킬 수 있습니다.
  };

  return (
    <div className="identity-verification">
      <h2>신원 인증</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>학교</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
        </div>
        <div>
          <label>학번</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>나이</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">신원 인증 제출</button>
      </form>
    </div>
  );
}

export default IdentityVerification;
