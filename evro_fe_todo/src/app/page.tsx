"use client"
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/todo');
  // Because we redirect, we don't need to return UI here
  return null;
}
