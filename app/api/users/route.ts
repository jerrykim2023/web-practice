// src/app/api/users/route.ts
// Nest.js 서버 기능 중 클라이언트에게 응답(Response)을 쉽게 보낼 수 있게 해주는 객체를 불러온다. 
import { NextResponse } from "next/server";

// 실제 DB 대신 사용할 임시 데이터 (메모리 DB)
const mockUsers = [
    {id: 1, name: '관리자', age: '35', email: 'admin@jpi.co.kr'},
    {id: 2, name: '김경우', age: '47', email: 'jerry@jpi.co.kr'},
    {id: 3, name: '김청명', age: '41', email: 'kcm@jpico.kr'},
];

// GET 요청: 데이터 조회 (Winform의 SELECT)
export async function GET() {
    return NextResponse.json(mockUsers);
}

// POST 요청: 데이터 추가 (Winform의 INSERT)
// POST 함수 선언: 클라이언트가 /api/users 주소로 POST 요청을 보냈을 때 자동으로 실행되는 함수
// request 매개변수에는 클라이언트가 보낸 데이터 등의 정보가 담겨있음
export async function POST(request: Request) {
    // 요청 본문 파싱: 클라이언트가 보낸 데이터(새로운 사용자 정보)를 
    // 자바스크립트 객체로 변환해서 newUser라는 변수에 저장합니다. 
    // (await는 변환이 끝날 때까지 기다리라는 뜻입니다.)
    const newUser = await request.json();
    newUser.id = Date.now();
    mockUsers.push(newUser);
    // POST 응답: 저장이 잘 끝났다는 것을 프론트엔드에 알려주기 위해, 
    // "추가성공"이라는 메시지와 함께 방금 생성된 사용자 데이터(newUser)를 
    // JSON 형태로 묶어서 응답으로 보냅니다. 
    return NextResponse.json({message: "추가성공", user: newUser});
}