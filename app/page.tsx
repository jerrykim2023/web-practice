// src/app/page.tsx
"use client";

import { useState } from "react";

// 1. 데이터 구조 정의 (C#의 Class/Struct 역할)
// TypeScript의 type alias로 사용자 정보를 정의 | UserState는 실제 데이터가 아니라 "user 객체가 이런 모양이어야 한다"는 설계도
type UserState = {
  name: string;
  age: string;
  email: string;
};

export default function Home() {
  // 2. 여러 변수 대신 하나의 객체로 상태 선언
  const [user, setUser] = useState<UserState>({
    name: "",
    age: "",
    email: "",
  });

  // 3. 통합 이벤트 핸들러 (C#의 공용 이벤트 핸들러와 유사)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // input의 name 속성과 입력된 value를 가져옴

    setUser((prev) => ({
      ...prev,           // 4. Spread 연산자: 기존 객체 내용을 그대로 복사 (C#의 Shallow Copy 느낌) | name: "홍길동", age: 25, email: "abc@..."
      [name]: value,      // 5. 바뀐 속성(name)만 새 값(value)으로 덮어쓰기
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-violet-800 border-b pb-2">회원 정보 수정</h2>
        
        <div className="space-y-4">
          {/* 각 input에 name 속성을 주는 것이 핵심입니다! */}
          <div>
            <label className="text-sm font-semibold text-slate-600">이름</label>
            <input
              name="name" // 객체의 key값과 일치시킴
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 font-bold text-blue-800"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">나이</label>
            <input
              name="age"
              type="number"
              value={user.age}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">이메일</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 text-black"
            />
          </div>
        </div>

        {/* 결과창 */}
        <div className="mt-8 p-4 bg-slate-100 rounded-lg text-slate-700 text-sm font-mono">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>

        {/* 초기화 button */}
        <button
          onClick={() => setUser({ name: "", age: "", email: "" })}
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-amber-600"
        >
          초기화
        </button>
      </div>
    </main>
  );
}