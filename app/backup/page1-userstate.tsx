// src/app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  // 1. 상태 선언 (C#의 속성/필드와 유사)
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">사용자 정보 입력</h2>
        
        <div className="space-y-4">
          {/* 이름 입력 (Winform의 TextBox) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Input your name"
              value={name}
              onChange={(e) => setName(e.target.value)} // onChange 이벤트 핸들러
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>

          {/* 나이 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              placeholder="input your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            />
          </div>
        </div>

        {/* 결과 출력창 (Winform의 Panel/GroupBox 내 Label들) */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-800 mb-2 underline">실시간 출력 결과</h3>
          <p className="text-gray-700">
            <strong>이름:</strong> {name || "입력 전..."}
          </p>
          <p className="text-gray-700">
            <strong>나이:</strong> {age ? `${age}세` : "입력 전..."}
          </p>
          {/* <p className="text-red-950">
            {Number(age) >= 20 ? "성인입니다." : ""}
          </p> */}
          
          {/* age가 있고, 20세 이상일 때만 이 태그를 그려라! */}
          {Number(age) >= 20 && (<p className="text-red-950">성인입니다.</p>
          )}
        </div>
      </div>
    </main>
  );
}