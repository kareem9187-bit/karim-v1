'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, TextArea } from "@heroui/react";
import { getSiteSettings, updateSiteSettings } from './actions';
import toast from 'react-hot-toast';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function SettingsAdminPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then((res) => {
      setData(res || {});
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateSiteSettings(formData);

    if (!res || !res.success) {
      toast.error('Failed to update settings');
    } else {
      toast.success('Settings updated successfully');
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card >
          <Card.Header className="border-b border-white/5 bg-[#050505]/50 px-6 py-4">
            <h2 className="text-xl font-semibold">General</h2>
          </Card.Header>
          <Card.Content className="gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Site Name (English)</label><Input
                name="siteName"

                defaultValue={data?.siteName || 'Karim Abdelaziz'}
                required
                variant="secondary"

               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Site Name (Arabic)</label><Input
                name="siteNameAr"

                defaultValue={data?.siteNameAr}
                dir="rtl"
                variant="secondary"

               /></div>

              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Global Description (English)</label><TextArea
                name="description"

                defaultValue={data?.description}
                className="md:col-span-2"
                variant="secondary"

               /></div>
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Global Description (Arabic)</label><TextArea
                name="descriptionAr"

                defaultValue={data?.descriptionAr}
                dir="rtl"
                className="md:col-span-2"
                variant="secondary"

               /></div>
            </div>
          </Card.Content>
        </Card>

        <Card >
          <Card.Header className="border-b border-white/5 bg-[#050505]/50 px-6 py-4">
            <h2 className="text-xl font-semibold">SEO & Branding</h2>
          </Card.Header>
          <Card.Content className="gap-6 p-6">
            <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Keywords (comma separated)</label><TextArea
              name="keywords"

              defaultValue={data?.keywords}
              variant="secondary"

             /></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Theme Color (Hex)</label><Input
                name="themeColor"

                defaultValue={data?.themeColor || '#04060a'}
                variant="secondary"

               /></div>

              <ImageUploadField
                name="favicon"
                label="Favicon"
                defaultValue={data?.favicon}
                className="mb-2"
              />

              <ImageUploadField
                name="ogImage"
                label="Open Graph Image (Social Sharing)"
                defaultValue={data?.ogImage}
                className="mb-2 md:col-span-2"
              />
            </div>
          </Card.Content>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"

            className="bg-blue-600 px-8"
          >
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
