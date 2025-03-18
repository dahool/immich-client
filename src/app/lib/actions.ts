'use server'
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function fetchUser(): Promise<any> {
  const session = await auth();
  return session?.user;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}