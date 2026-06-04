'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, TextArea } from '@heroui/react';
import toast from 'react-hot-toast';
import { getSEO, updateSEO } from './actions';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function SeoAdminPage() {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSEO().then((res) => {
      setData(res || {});
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateSEO(new FormData(e.currentTarget));
    if (res.success) {
      toast.success('SEO settings saved');
    } else {
      toast.error('Failed to save SEO settings');
    }
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">SEO</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <Card.Header className="border-b border-white/5 bg-[#050505]/50 px-6 py-4">
            <h2 className="text-xl font-semibold">Search & Social Sharing</h2>
          </Card.Header>
          <Card.Content className="p-6 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Keywords</label>
              <TextArea name="keywords" defaultValue={data?.keywords || ''} rows={4} variant="secondary" />
            </div>
            <div>
              <ImageUploadField
                name="ogImage"
                label="Open Graph Image"
                defaultValue={data?.ogImage || ''}
              />
            </div>
            <div>
              <ImageUploadField
                name="favicon"
                label="Favicon"
                defaultValue={data?.favicon || ''}
              />
            </div>
          </Card.Content>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 px-8">Save SEO</Button>
        </div>
      </form>
    </div>
  );
}
