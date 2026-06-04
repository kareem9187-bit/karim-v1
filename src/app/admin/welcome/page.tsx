'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { getWelcomeChapters, updateWelcomeChapter } from './actions';
import toast from 'react-hot-toast';

export default function WelcomeAdminPage() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingChapter, setEditingChapter] = useState<any | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    setIsLoading(true);
    const data = await getWelcomeChapters();
    setChapters(data || []);
    setIsLoading(false);
  };

  const handleEdit = (chapter: any) => {
    setEditingChapter(chapter);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingChapter?.id) {
      formData.append('id', editingChapter.id);
    }

    const res = await updateWelcomeChapter(formData);

    if (!res || !res.success) {
      toast.error('Failed to save chapter');
    } else {
      toast.success('Chapter saved successfully');
      loadChapters();
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Chapters</h1>
      </div>

      <Card >
        <Card.Content className="p-0">
          {!chapters || chapters.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table>
              <Table.Content aria-label="Welcome chapters">
            <TableHeader>
              <TableColumn>ORDER</TableColumn>
              <TableColumn>NUMBER</TableColumn>
              <TableColumn>LABEL</TableColumn>
              <TableColumn>PHRASE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn >ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={chapters}>
              {(item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-semibold">{item.number}{item.suffix}</TableCell>
                  <TableCell>{item.label}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.phrase}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="secondary" onPress={() => handleEdit(item)}>Edit</Button>
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

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}  >
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSubmit} className="space-y-8">
              <Modal.Header>Edit Welcome Chapter</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 mb-4">
                    <Switch name="active" defaultSelected={editingChapter?.active} value="true">
                      Active
                    </Switch>
                  </div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Number</label><Input
                    name="number"

                    defaultValue={editingChapter?.number}
                    required
                    variant="secondary"

                   /></div>
                  <div className="flex gap-2">
                    <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Suffix (EN)</label><Input
                      name="suffix"

                      defaultValue={editingChapter?.suffix}
                      variant="secondary"

                     /></div>
                    <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Suffix (AR)</label><Input
                      name="suffixAr"

                      defaultValue={editingChapter?.suffixAr}
                      dir="rtl"
                      variant="secondary"

                     /></div>
                  </div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Label (English)</label><Input
                    name="label"

                    defaultValue={editingChapter?.label}
                    required
                    variant="secondary"

                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Label (Arabic)</label><Input
                    name="labelAr"

                    defaultValue={editingChapter?.labelAr}
                    dir="rtl"
                    variant="secondary"

                   /></div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Phrase (English)</label><Input
                    name="phrase"

                    defaultValue={editingChapter?.phrase}
                    required
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Phrase (Arabic)</label><Input
                    name="phraseAr"

                    defaultValue={editingChapter?.phraseAr}
                    dir="rtl"
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Subtext (English)</label><Input
                    name="subText"

                    defaultValue={editingChapter?.subText}
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Subtext (Arabic)</label><Input
                    name="subTextAr"

                    defaultValue={editingChapter?.subTextAr}
                    dir="rtl"
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Chapter</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
