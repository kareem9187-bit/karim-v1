'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input } from "@heroui/react";
import { getHero, updateHero } from './actions';
import toast from 'react-hot-toast';

export default function HeroAdminPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getHero().then((res) => {
      setData(res || {});
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateHero(formData);
    
    if (!res || !res.success) {
      toast.error('Failed to update Hero section');
    } else {
      toast.success('Hero section updated successfully');
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">Hero Section</h1>
      
      <form onSubmit={handleSubmit}>
        <Card >
          <Card.Header className="border-b border-[rgba(255,255,255,0.1)] px-6 py-4">
            <h2 className="text-xl font-semibold">General Info</h2>
          </Card.Header>
          <Card.Content className="gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Name (English)</label><Input 
                name="name" 
                 
                defaultValue={data?.name} 
                required 
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Name (Arabic)</label><Input 
                name="nameAr" 
                 
                defaultValue={data?.nameAr} 
                dir="rtl"
                variant="secondary"
                
               /></div>
              
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Greeting (English)</label><Input 
                name="greeting" 
                 
                defaultValue={data?.greeting} 
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Greeting (Arabic)</label><Input 
                name="greetingAr" 
                 
                defaultValue={data?.greetingAr} 
                dir="rtl"
                variant="secondary"
                
               /></div>
              
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Tagline (English)</label><Input 
                name="tagline" 
                 
                defaultValue={data?.tagline} 
                className="md:col-span-2"
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Tagline (Arabic)</label><Input 
                name="taglineAr" 
                 
                defaultValue={data?.taglineAr} 
                dir="rtl"
                className="md:col-span-2"
                variant="secondary"
                
               /></div>
            </div>
          </Card.Content>
        </Card>

        <Card >
          <Card.Header className="border-b border-[rgba(255,255,255,0.1)] px-6 py-4">
            <h2 className="text-xl font-semibold">Call to Actions</h2>
          </Card.Header>
          <Card.Content className="gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Primary CTA Text (English)</label><Input 
                name="ctaPrimaryText" 
                 
                defaultValue={data?.ctaPrimaryText} 
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Primary CTA Text (Arabic)</label><Input 
                name="ctaPrimaryTextAr" 
                 
                defaultValue={data?.ctaPrimaryTextAr} 
                dir="rtl"
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Primary CTA Link</label><Input 
                name="ctaPrimaryLink" 
                 
                defaultValue={data?.ctaPrimaryLink} 
                className="md:col-span-2"
                variant="secondary"
                
               /></div>
              
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Secondary CTA Text (English)</label><Input 
                name="ctaSecondaryText" 
                 
                defaultValue={data?.ctaSecondaryText} 
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Secondary CTA Text (Arabic)</label><Input 
                name="ctaSecondaryTextAr" 
                 
                defaultValue={data?.ctaSecondaryTextAr} 
                dir="rtl"
                variant="secondary"
                
               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Secondary CTA Link</label><Input 
                name="ctaSecondaryLink" 
                 
                defaultValue={data?.ctaSecondaryLink} 
                className="md:col-span-2"
                variant="secondary"
                
               /></div>
            </div>
          </Card.Content>
        </Card>

        <Card >
          <Card.Header className="border-b border-[rgba(255,255,255,0.1)] px-6 py-4">
            <h2 className="text-xl font-semibold">Media</h2>
          </Card.Header>
          <Card.Content className="gap-6 p-6">
             <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Background Image URL</label><Input 
                name="image" 
                 
                defaultValue={data?.image} 
                variant="secondary"
                
               /></div>
          </Card.Content>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            
            className="bg-blue-600 px-8"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
