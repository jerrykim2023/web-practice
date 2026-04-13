// src/app/page.tsx
"use client";

import { useState } from "react";
import UserInput from "@/components/UserInput";
import UserDisplay from "@/components/UserDisplay";

export default function Home() {
  const [user, setUser] = useState({ name: "", age: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => setUser({ name: "", age: "", email: "" });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-black">회원 관리 시스템</h1>
        {/* 컴포넌트 조립 및 데이터(Props) 전달 */}
        <UserInput user={user} onChange={handleChange} onClear={handleClear} />
        <UserDisplay user={user} />
      </div>
    </main>
  );
}