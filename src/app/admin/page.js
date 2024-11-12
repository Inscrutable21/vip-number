import LoginForm from '@/components/admin/LoginForm';
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminPage() {
  try {
    // Check if user is already authenticated
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      // Use permanent: false to indicate this is a temporary redirect
      redirect('/admin/dashboard', 'replace');
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <LoginForm />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in admin page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500">
          An error occurred. Please try again later.
        </div>
      </div>
    );
  }
}