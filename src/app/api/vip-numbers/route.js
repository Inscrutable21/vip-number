// src/app/api/vip-numbers/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper function to validate VIP number input
const validateVipNumber = (number, price) => {
  const errors = [];
  if (!number || number.trim().length < 3) {
    errors.push('VIP number must be at least 3 characters long');
  }
  if (!price || price <= 0) {
    errors.push('Price must be greater than 0');
  }
  return errors;
};

// GET /api/vip-numbers
export async function GET() {
  try {
    const vipNumbers = await prisma.vipNumber.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(vipNumbers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch VIP numbers' },
      { status: 500 }
    );
  }
}

// POST /api/vip-numbers
export async function POST(request) {
  try {
    const data = await request.json();
    const { number, price } = data;

    // Validate input
    const errors = validateVipNumber(number, price);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Check if number already exists
    const existing = await prisma.vipNumber.findUnique({
      where: { number: number.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'VIP number already exists' },
        { status: 400 }
      );
    }

    const vipNumber = await prisma.vipNumber.create({
      data: {
        number: number.trim(),
        price: parseFloat(price),
      },
    });

    return NextResponse.json(vipNumber, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create VIP number' },
      { status: 500 }
    );
  }
}

// PATCH /api/vip-numbers
export async function PATCH(request) {
  try {
    const data = await request.json();
    const { id, number, price, status } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // Validate input
    const errors = validateVipNumber(number, price);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Check if number already exists (excluding current record)
    const existing = await prisma.vipNumber.findFirst({
      where: {
        number: number.trim(),
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'VIP number already exists' },
        { status: 400 }
      );
    }

    const vipNumber = await prisma.vipNumber.update({
      where: { id },
      data: {
        number: number.trim(),
        price: parseFloat(price),
        status: status || 'available',
      },
    });

    return NextResponse.json(vipNumber);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update VIP number' },
      { status: 500 }
    );
  }
}

// DELETE /api/vip-numbers
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.vipNumber.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete VIP number' },
      { status: 500 }
    );
  }
}