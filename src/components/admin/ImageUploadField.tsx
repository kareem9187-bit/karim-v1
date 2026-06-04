'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@heroui/react';
import toast from 'react-hot-toast';

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
  className?: string;
  accept?: string;
  onUploaded?: (url: string) => void | Promise<void>;
};

export default function ImageUploadField({
  name,
  label,
  defaultValue,
  placeholder = 'Paste image URL or upload a file',
  required = false,
  className = '',
  accept = 'image/*',
  onUploaded,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(defaultValue || '');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Upload failed');
      }

      setValue(data.url);
      await onUploaded?.(data.url);
      toast.success('File uploaded');
    } catch (error: any) {
      toast.error(error?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="flex gap-2">
        <Input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          required={required}
          variant="secondary"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="secondary"
          isDisabled={isUploading}
          onPress={() => fileInputRef.current?.click()}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      {value ? (
        <img
          src={value}
          alt=""
          className="mt-3 h-24 w-24 rounded-md border border-white/10 bg-black/30 object-cover"
        />
      ) : null}
    </div>
  );
}
