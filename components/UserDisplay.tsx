// src/components/UserDisplay.tsx
type Props = {
  user: { name: string; age: string; email: string };
};

export default function UserDisplay({ user }: Props) {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <p className="text-black"><strong>이름:</strong> {user.name || "미입력"}</p>
      <p className="text-black"><strong>나이:</strong> {user.age}세 {Number(user.age) >= 20 && " (성인)"}</p>
      <p className="text-black"><strong>이메일:</strong> {user.email}</p>
    </div>
  );
}