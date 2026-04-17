// src/app/page.tsx
"use client";

import { useState } from "react";
import UserInput from "@/components/UserInput";

// 사용자 1명의 타입 정의 | type 을 "User"라는 변수로 관리
type User = {
  id: number;
  name: string;
  age: string;
  email: string;
};

export default function Home() {
  // 1. 개별 입력 상태
  const [user, setUser] = useState({ name: "", age: "", email: "" });
  // 2. 전체 목록 상태 (Winform의 DataSource 역할)
  const [userList, setUserList] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 3. 리스트에 추가 (C#의 list.Add와 유사하지만 새 배열을 생성함)
  const handleAdd = () => {
    if (!user.name) return alert("이름을 입력하세요.");

    const newUser = {
      ...user, // spread operator
      id: Date.now(), // Winform의 PK(Primary Key)처럼 고유값 생성
    };

    setUserList((prev) => [...prev, newUser]); // 기존 리스트 + 새 유저
    setUser({ name: "", age: "", email: "" }); // 입력창 초기화
  };

  // 4. 리스트에서 삭제 (Filter 사용)
  const handleDelete = (id: number) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  // 5.리스트 전체삭제
  const handleDeleteAll = () => {
    setUserList([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50 text-black">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">사용자 관리 그리드</h1>

        {/* 입력 섹션 */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="이름"
            className="border p-2 rounded"
          />
          <input
            name="age"
            type="number"
            value={user.age}
            onChange={handleChange}
            placeholder="나이"
            className="border p-2 rounded"
          />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일"
            className="border p-2 rounded"
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white rounded font-bold py-1"
            >
              추가하기
            </button>
            <button
              onClick={handleDeleteAll}
              className="bg-red-700 text-white rounded font-bold py-1"
            >
              삭제하기
            </button>
          </div>
        </div>

        {/* 목록 섹션 (Grid/Table) */}
        <table className="w-full border-collapse">
          <thead>
            {" "}
            {/* 테이블의 머리글 요소 */}
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left text-sm">이름</th>
              <th className="p-2 text-left text-sm">나이</th>
              <th className="p-2 text-left text-sm">이메일</th>
              <th className="p-2 text-center text-sm">관리</th>
            </tr>
          </thead>
          <tbody>
            {userList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-8 text-gray-400">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              userList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.age}세</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
