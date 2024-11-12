// src/components/admin/LogoutButton.js
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      router.refresh(); // Refresh server components
      router.push('/admin'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white"
    >
      Logout
    </Button>
  );
}

