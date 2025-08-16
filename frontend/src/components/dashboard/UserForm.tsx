import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import type { User } from '@/types/user';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().optional(),
  age: z.number().min(0).max(150).optional(),
  isActive: z.boolean().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: user ? undefined : '',
      age: user?.age,
      isActive: user?.isActive ?? true,
    },
  });

  const handleFormSubmit = async (data: UserFormData): Promise<void> => {
    // Remove password field for updates
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updateData } = data;
      await onSubmit(updateData as UserFormData);
    } else {
      await onSubmit(data);
    }
  };

  const getSubmitButtonText = (): string => {
    if (isSubmitting) {
      return 'Saving...';
    }
    return user ? 'Update User' : 'Create User';
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>{user ? 'Edit User' : 'Add New User'}</CardTitle>
          <CardDescription>
            {user
              ? 'Update user information'
              : 'Enter user information to create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                type='text'
                placeholder='Enter full name'
                {...register('name')}
              />
              {errors.name && (
                <p className='text-sm text-red-500'>{errors.name.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter email address'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            {!user && (
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter password'
                  {...register('password')}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password.message}</p>
                )}
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='age'>Age</Label>
              <Input
                id='age'
                type='number'
                placeholder='Enter age'
                {...register('age', { valueAsNumber: true })}
              />
              {errors.age && (
                <p className='text-sm text-red-500'>{errors.age.message}</p>
              )}
            </div>

            <div className='flex space-x-2 pt-4'>
              <Button type='submit' disabled={isSubmitting} className='flex-1'>
                {getSubmitButtonText()}
              </Button>
              <Button type='button' variant='outline' onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
