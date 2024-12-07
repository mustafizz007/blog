import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/login-form';

export function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-neutral-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-neutral-900 underline">
            Sign up
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  );
}