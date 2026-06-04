'use client';

import { useEffect, useState } from 'react';
import { createOverlayState } from '@/lib/overlay-state';
import { Button, Card, Input, Modal, Switch, Table, TextArea, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { getAllFaqs, upsertFaq, deleteFaq } from './actions';
import toast from 'react-hot-toast';

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const modalState = createOverlayState(isOpen, setIsOpen);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getAllFaqs();
    setFaqs(data || []);
    setIsLoading(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const res = await deleteFaq(id);
    if (res.success) {
      toast.success('FAQ deleted');
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingItem?.id) {
      formData.append('id', editingItem.id);
    }

    const res = await upsertFaq(formData);

    if (!res || !res.success) {
      toast.error('Failed to save FAQ');
    } else {
      toast.success('FAQ saved successfully');
      loadData();
      setIsOpen(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add FAQ
        </Button>
      </div>

      <Card>
        <Card.Content className="p-0">
          {!faqs || faqs.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table>
              <Table.Content aria-label="FAQs">
              <TableHeader>
                <TableColumn>ORDER</TableColumn>
                <TableColumn>QUESTION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody items={faqs}>
                {(item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.order}</TableCell>
                    <TableCell className="font-medium max-w-sm truncate">
                      <span title={item.question}>{item.question}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="secondary" onPress={() => handleEdit(item)}>Edit</Button>
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
            <form onSubmit={handleSubmit} className="space-y-8">
              <Modal.Header>{editingItem ? 'Edit FAQ' : 'Add FAQ'}</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Order</label>
                      <Input
                        name="order"
                        type="number"
                        defaultValue={editingItem?.order || 0}
                        required
                        variant="secondary"
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <Switch name="active" defaultSelected={editingItem?.active !== false} value="true">
                        Active
                      </Switch>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Question (English)</label>
                    <Input
                      name="question"
                      defaultValue={editingItem?.question}
                      required
                      variant="secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Question (Arabic)</label>
                    <Input
                      name="questionAr"
                      defaultValue={editingItem?.questionAr}
                      dir="rtl"
                      variant="secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Answer (English)</label>
                    <TextArea
                      name="answer"
                      defaultValue={editingItem?.answer}
                      required
                      rows={4}
                      variant="secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Answer (Arabic)</label>
                    <TextArea
                      name="answerAr"
                      defaultValue={editingItem?.answerAr}
                      dir="rtl"
                      rows={4}
                      variant="secondary"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save FAQ</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
