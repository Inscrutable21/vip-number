// src/app/api/vip-numbers/search/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const type = searchParams.get('type') || 'anywhere';

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Build the search condition based on the search type
    let whereCondition = {};
    
    switch (type) {
      case 'start':
        whereCondition = {
          number: {
            startsWith: query
          }
        };
        break;
      case 'end':
        whereCondition = {
          number: {
            endsWith: query
          }
        };
        break;
      case 'anywhere':
      default:
        whereCondition = {
          number: {
            contains: query
          }
        };
        break;
    }

    // Only show available numbers
    whereCondition = {
      ...whereCondition,
      status: 'available',
    };

    // Fetch the matching VIP numbers
    const vipNumbers = await prisma.vipNumber.findMany({
      where: whereCondition,
      select: {
        id: true,
        number: true,
        price: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        price: 'desc'
      },
      take: 50 // Limit results to prevent overwhelming response
    });

    // Return the results
    return NextResponse.json({
      success: true,
      count: vipNumbers.length,
      data: vipNumbers
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}