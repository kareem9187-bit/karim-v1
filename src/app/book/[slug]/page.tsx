import { redirect } from 'next/navigation';

export const metadata = { title: 'Start a Project — Karim Abdelaziz' };

export default function BookSlugPage() {
  redirect('/#contact');
}
