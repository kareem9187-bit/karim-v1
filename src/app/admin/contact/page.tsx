'use client';

import { useEffect, useState } from 'react';
import { createOverlayState } from '@/lib/overlay-state';
import { Button, Card, Input, Modal, Switch, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TextArea } from '@heroui/react';
import toast from 'react-hot-toast';
import { deleteSocialLink, getAllSocialLinks, getContactInfo, updateContactInfo, upsertSocialLink } from './actions';

export default function ContactAdminPage() {
  const [contact, setContact] = useState<any>({});
  const [socials, setSocials] = useState<any[]>([]);
  const [editingSocial, setEditingSocial] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalState = createOverlayState(isOpen, setIsOpen);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [contactData, socialData] = await Promise.all([getContactInfo(), getAllSocialLinks()]);
    setContact(contactData || {});
    setSocials(socialData || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateContactInfo(new FormData(e.currentTarget));
    if (res.success) {
      toast.success('Contact info saved');
      loadData();
    } else {
      toast.error('Failed to save contact info');
    }
  };

  const handleSocialSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingSocial?.id) formData.append('id', editingSocial.id);
    const res = await upsertSocialLink(formData);
    if (res.success) {
      toast.success('Social link saved');
      setIsOpen(false);
      loadData();
    } else {
      toast.error('Failed to save social link');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    const res = await deleteSocialLink(id);
    if (res.success) {
      toast.success('Social link deleted');
      loadData();
    }
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Contact Info</h1>

      <form onSubmit={handleContactSubmit}>
        <Card>
          <Card.Header className="border-b border-white/5 bg-[#050505]/50 px-6 py-4">
            <h2 className="text-xl font-semibold">Public Contact Details</h2>
          </Card.Header>
          <Card.Content className="p-6 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">WhatsApp</label>
                <Input name="whatsapp" defaultValue={contact?.whatsapp || ''} variant="secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <Input name="email" type="email" defaultValue={contact?.email || ''} variant="secondary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <Input name="phone" defaultValue={contact?.phone || ''} variant="secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Contact Tagline (English)</label>
                <TextArea name="tagline" defaultValue={contact?.tagline || ''} rows={3} variant="secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">Contact Tagline (Arabic)</label>
                <TextArea name="taglineAr" defaultValue={contact?.taglineAr || ''} rows={3} dir="rtl" variant="secondary" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <div className="flex justify-end mb-10">
          <Button type="submit" className="bg-blue-600 px-8">Save Contact Info</Button>
        </div>
      </form>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Social Links</h2>
        <Button onPress={() => { setEditingSocial(null); setIsOpen(true); }} className="bg-blue-600">
          Add Social Link
        </Button>
      </div>

      <Card>
        <Card.Content className="p-0">
          {socials.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No social links yet.</div>
          ) : (
            <Table>
              <Table.Content aria-label="Social links">
                <TableHeader>
                  <TableColumn>ORDER</TableColumn>
                  <TableColumn>PLATFORM</TableColumn>
                  <TableColumn>LABEL</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody items={socials}>
                  {(item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell className="font-medium">{item.platform}</TableCell>
                      <TableCell>{item.label || item.url}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button size="sm" variant="secondary" onPress={() => { setEditingSocial(item); setIsOpen(true); }}>Edit</Button>
                          <Button size="sm" variant="secondary" onPress={() => handleDelete(item.id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table.Content>
            </Table>
          )}
        </Card.Content>
      </Card>

      <Modal state={modalState}>
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSocialSubmit}>
              <Modal.Header>{editingSocial ? 'Edit Social Link' : 'Add Social Link'}</Modal.Header>
              <Modal.Body className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Order</label>
                    <Input name="order" type="number" defaultValue={editingSocial?.order || 0} required variant="secondary" />
                  </div>
                  <div className="flex items-center px-2">
                    <Switch name="active" defaultSelected={editingSocial?.active !== false} value="true">Active</Switch>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Platform</label>
                    <Input name="platform" defaultValue={editingSocial?.platform || ''} required variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Label</label>
                    <Input name="label" defaultValue={editingSocial?.label || ''} variant="secondary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">URL</label>
                    <Input name="url" defaultValue={editingSocial?.url || ''} required variant="secondary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Icon Class</label>
                    <Input name="icon" defaultValue={editingSocial?.icon || ''} placeholder="fa-brands fa-instagram" variant="secondary" />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Social Link</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
