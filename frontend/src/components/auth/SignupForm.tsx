import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import type { SignupCredentials } from '@/types/auth';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    age: z.number().min(0).max(150).optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { signup, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData): Promise<void> => {
    try {
      const signupData = {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
      };
      await signup(signupData as SignupCredentials);
      toast.success('Account created successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(errorMessage);
    }
  };

  const handleFormSubmit = (data: SignupFormData): void => {
    onSubmit(data).catch(() => {
      // Error is handled in onSubmit
    });
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>Create account</CardTitle>
        <CardDescription className='text-center'>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              // value={'Temp Name'}
              id='name'
              type='text'
              placeholder='Enter your full name'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-sm text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              // value={'test@test.com'}
              id='email'
              type='email'
              placeholder='Enter your email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='age'>Age</Label>
            <Input
              // value={20}
              id='age'
              type='number'
              placeholder='Enter your age'
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
              <p className='text-sm text-red-500'>{errors.age.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              // value={'temp123'}
              id='password'
              type='password'
              placeholder='Enter your password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              // value={'temp123'} 
              id='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-sm text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <button
              type='button'
              onClick={onSwitchToLogin}
              className='text-primary hover:underline'
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
