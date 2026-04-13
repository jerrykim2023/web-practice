// src/components/UserInput.tsx
type Props = {
  user: { name: string; age: string; email: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export default function UserInput({ user, onChange, onClear }: Props) {
  return (
    <div className="space-y-4 border-b pb-6">
      <input name="name" value={user.name} onChange={onChange} placeholder="이름" className="w-full p-2 border rounded text-black" />
      <input name="age" type="number" value={user.age} onChange={onChange} placeholder="나이" className="w-full p-2 border rounded text-black" />
      <input name="email" value={user.email} onChange={onChange} placeholder="이메일" className="w-full p-2 border rounded text-black" />
      <button onClick={onClear} className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300 text-black">초기화</button>
    </div>
  );
}