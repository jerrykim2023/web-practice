// src/app/page.tsx
"use client";

import { useState, useEffect } from "react"; // 1. useEffect 추가

type User = {
  id: number;
  name: string;
  age: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState({ name: "", age: "", email: "" });
  const [userList, setUserList] = useState<User[]>([]);

  // 2. [Load] 화면이 처음 켜질 때 로컬 스토리지에서 데이터 가져오기 (Winform_Load 역할)
  useEffect(() => {
    const savedData = localStorage.getItem("user-practice-list");
    if (savedData) {
      setUserList(JSON.parse(savedData)); // 문자열을 객체 배열로 변환
    }
  }, []); // []는 "처음 한 번만 실행"을 의미합니다.

  // 3. [Save] userList가 변경될 때마다 자동으로 로컬 스토리지에 저장 (자동 저장 로직)
  useEffect(() => {
    // 주의: userList가 초기값([])일 때 덮어씌워지지 않도록 체크 로직을 넣기도 하지만,
    // 여기서는 변화가 감지될 때마다 동기화하는 방식을 씁니다.
    localStorage.setItem("user-practice-list", JSON.stringify(userList));
  }, [userList]); // [userList]는 "userList가 바뀔 때마다 실행"을 의미합니다.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!user.name) return alert("이름을 입력하세요.");
    const newUser = { ...user, id: Date.now() };
    setUserList((prev) => [...prev, newUser]);
    setUser({ name: "", age: "", email: "" });
  };

  const handleDelete = (id: number) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  const handleDeleteAll = () => {
    if (confirm("정말 모두 삭제하시겠습니까?")) {
      setUserList([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50 text-black">
      {/* ... (기존 UI와 동일) ... */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md text-black">
        <h1 className="text-2xl font-bold mb-6">사용자 관리 (Storage 연동)</h1>

        {/* 입력창 UI */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-black">
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="이름"
            className="border p-2 rounded text-black"
          />
          <input
            name="age"
            type="number"
            value={user.age}
            onChange={handleChange}
            placeholder="나이"
            className="border p-2 rounded text-black"
          />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="이메일"
            className="border p-2 rounded text-black"
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white rounded font-bold py-1 hover:bg-blue-700"
            >
              추가
            </button>
            <button
              onClick={handleDeleteAll}
              className="bg-red-700 text-white rounded font-bold py-1 hover:bg-red-800"
            >
              전체 삭제
            </button>
          </div>
        </div>

        {/* 테이블 UI */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-black">
              <th className="p-2 text-left">이름</th>
              <th className="p-2 text-left">나이</th>
              <th className="p-2 text-left">이메일</th>
              <th className="p-2 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 text-black"
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.age}세</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-sm"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
