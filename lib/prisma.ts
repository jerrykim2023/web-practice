// lib/prisma.ts  (lib 폴더 없으면 직접 생성)

import 'dotenv/config'
import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '@/app/generated/prisma/client'

// MS-SQL 연결 설정
const sqlConfig = {
  server: process.env.DB_HOST ?? 'localhost',
  port: 1433,
  database: process.env.DB_NAME ?? 'testdb',
  user: process.env.DB_USER ?? 'sa',
  password: process.env.DB_PASSWORD ?? '',
  options: {
    encrypt: true,
    trustServerCertificate: true, // 로컬 개발용
  },
}

// Driver Adapter 생성 (= SQL Server 전용 통역사)
const adapter = new PrismaMssql(sqlConfig)

// 싱글톤 패턴: 개발 환경에서 중복 연결 방지
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}