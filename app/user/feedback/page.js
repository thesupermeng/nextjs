'use client';
import { Feedback } from '@/components/feedback';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';

export default function Page() {
  return (
    <FullPageContent>
      <NavHeader label='Customer Feedback' />
      <Feedback />
    </FullPageContent>
  );
}
