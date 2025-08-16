import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login({ email, password });
        window.location.href = '/';
      } else {
        await signup({ name, email, password, confirmPassword: password });
        window.location.href = '/';
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground flex items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-4'>
        <h1 className='text-2xl font-semibold text-center'>Welcome</h1>
        {!isLogin && (
          <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        )}
        <Input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className='text-sm text-red-500'>{error}</div>}
        <Button className='w-full' onClick={submit} disabled={loading}>
          {loading ? 'Please wait…' : isLogin ? 'Login' : 'Sign up'}
        </Button>
        <div className='text-center'>
          <button className='text-sm underline' onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

