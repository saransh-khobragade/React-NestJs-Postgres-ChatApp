import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  onCreate?: () => void;
}

export const Navbar: React.FC<Props> = ({ onCreate }) => {
  const { user, logout } = useAuth();
  return (
    <header className='border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <div className='text-xl font-semibold'>Mediumish</div>
        <div className='space-x-2'>
          {user ? (
            <>
              <Button variant='outline' onClick={onCreate}>Write</Button>
              <Button variant='ghost' onClick={logout}>Logout</Button>
            </>
          ) : (
            <a href='/auth' className='text-sm underline'>Login</a>
          )}
        </div>
      </div>
    </header>
  );
};

