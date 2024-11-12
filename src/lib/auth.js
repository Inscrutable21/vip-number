import { hash, compare } from 'bcryptjs';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function comparePasswords(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies(); // Added await here
    const sessionId = cookieStore.get('admin_session')?.value;

    if (!sessionId) {
      return false;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: sessionId }
    });

    return !!admin;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}