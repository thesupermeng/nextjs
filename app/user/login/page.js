'use client';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { LoginLayout } from '@/componentsH5/loginLayout/LoginLayout';

export default function Login({ children }) {
  return (
    <FullPageContent>
      <LoginLayout type='login'></LoginLayout>
    </FullPageContent>
  );
}
