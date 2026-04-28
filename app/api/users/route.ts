// app/api/users/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/users → 전체 조회
export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (err) {
    console.error('DB 조회 오류:', err)
    return NextResponse.json({ error: 'DB 조회 실패' }, { status: 500 })
  }
}

// POST /api/users → 신규 등록
export async function POST(request: Request) {
  const body = await request.json()
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      age: body.age,
      email: body.email,
    },
  })
  return NextResponse.json(newUser, { status: 201 })
}