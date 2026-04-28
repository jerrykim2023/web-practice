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
  const [userList, setUserList] = useState<User[]>([]); // 빈 배열로 시작

  // 데이터를 가져오는 함수 (Winform의 LoadDataFromServer)
  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (!response.ok) {
      console.error("API 오류:", response.status, await response.text());
      return;
    }
    const data = await response.json();
    setUserList(data);
  };
  // 화면이 로드될 때 실행 | 주석으로 eslint 오류 표기 예외처리
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []); // [] 마운트 시 1번 실행

  // 글자가 입력될 때만다 실행되는 함수, 기존값 유지하고, 방금건드린 칸의 값만 바꿈
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 추가 버튼 클릭 시 서버로 전송
  const handleAdd = async () => {
    if (!user.name) return alert("이름을 입력하세요.");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      fetchUsers(); // 서버 저장 성공 시 리스트 다시 불러오기
      setUser({ name: "", age: "", email: "" });
    }
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
