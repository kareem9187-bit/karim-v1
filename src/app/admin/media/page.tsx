'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import toast from 'react-hot-toast';
import { deleteMedia, getMedia, updateMediaAlt } from './actions';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function MediaAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMedia = async () => {
    setIsLoading(true);
    setItems((await getMedia()) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleAltSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const alt = new FormData(e.currentTarget).get('alt') as string;
    const res = await updateMediaAlt(id, alt || '');
    if (res.success) {
      toast.success('Alt text saved');
      loadMedia();
    } else {
      toast.error('Failed to save alt text');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item?')) return;
    const res = await deleteMedia(id);
    if (res.success) {
      toast.success('Media deleted');
      loadMedia();
    } else {
      toast.error('Failed to delete media');
    }
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Media Library</h1>

      <Card className="mb-6">
        <Card.Content className="p-6">
          <ImageUploadField
            name="mediaUpload"
            label="Upload New Media"
            onUploaded={loadMedia}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="p-0">
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No media uploaded yet.</div>
          ) : (
            <Table>
              <Table.Content aria-label="Media library">
                <TableHeader>
                  <TableColumn>PREVIEW</TableColumn>
                  <TableColumn>FILE</TableColumn>
                  <TableColumn>ALT TEXT</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                  {(item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.type?.startsWith('image') ? (
                          <img src={item.url} alt={item.alt || item.filename} className="w-16 h-16 rounded object-cover bg-black/30" />
                        ) : (
                          <span className="text-xs text-gray-400">{item.type}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.filename}</div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-300 break-all">{item.url}</a>
                      </TableCell>
                      <TableCell>
                        <form onSubmit={(e) => handleAltSubmit(e, item.id)} className="flex gap-2 items-center">
                          <Input name="alt" defaultValue={item.alt || ''} variant="secondary" />
                          <Button type="submit" size="sm" variant="secondary">Save</Button>
                        </form>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="secondary" onPress={() => handleDelete(item.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table.Content>
            </Table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
