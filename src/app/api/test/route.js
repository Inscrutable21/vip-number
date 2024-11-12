import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Test prisma connection
    const adminCount = await prisma.admin.count()
    return NextResponse.json({ success: true, adminCount })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to connect to database' },
      { status: 500 }
    )
  }
}
