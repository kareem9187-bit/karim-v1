'use client';

import { useEffect, useState } from 'react';
import { createOverlayState } from '@/lib/overlay-state';
import { Button, Card, Input, Modal, Switch, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TextArea } from '@heroui/react';
import toast from 'react-hot-toast';
import { deleteProcessStep, getProcessSteps, upsertProcessStep } from './actions';

export default function ProcessAdminPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [editingStep, setEditingStep] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalState = createOverlayState(isOpen, setIsOpen);
  const [isLoading, setIsLoading] = useState(true);

  const loadSteps = async () => {
    setIsLoading(true);
    setSteps((await getProcessSteps()) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSteps();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingStep?.id) formData.append('id', editingStep.id);
    const res = await upsertProcessStep(formData);
    if (res.success) {
      toast.success('Process step saved');
      setIsOpen(false);
      loadSteps();
    } else {
      toast.error('Failed to save process step');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this process step?')) return;
    const res = await deleteProcessStep(id);
    if (res.success) {
      toast.success('Process step deleted');
      loadSteps();
    }
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Process Steps</h1>
        <Button onPress={() => { setEditingStep(null); setIsOpen(true); }} className="bg-blue-600">
          Add Process Step
        </Button>
      </div>

      <Card>
        <Card.Content className="p-0">
          {steps.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No process steps yet.</div>
          ) : (
            <Table>
              <Table.Content aria-label="Process steps">
                <TableHeader>
                  <TableColumn>ORDER</TableColumn>
                  <TableColumn>TITLE</TableColumn>
                  <TableColumn>TIME</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody items={steps}>
                  {(item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.timeLabel || '-'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button size="sm" variant="secondary" onPress={() => { setEditingStep(item); setIsOpen(true); }}>Edit</Button>
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
              <Modal.Header>{editingStep ? 'Edit Process Step' : 'Add Process Step'}</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Order</label>
                    <Input name="order" type="number" defaultValue={editingStep?.order || 0} required variant="secondary" />
                  </div>
                  <div className="flex items-center px-2">
                    <Switch name="active" defaultSelected={editingStep?.active !== false} value="true">Active</Switch>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title (English)</label>
                    <Input name="title" defaultValue={editingStep?.title || ''} required variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title (Arabic)</label>
                    <Input name="titleAr" defaultValue={editingStep?.titleAr || ''} dir="rtl" variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Time Label (English)</label>
                    <Input name="timeLabel" defaultValue={editingStep?.timeLabel || ''} variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Time Label (Arabic)</label>
                    <Input name="timeLabelAr" defaultValue={editingStep?.timeLabelAr || ''} dir="rtl" variant="secondary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Icon Key</label>
                    <Input name="icon" defaultValue={editingStep?.icon || ''} placeholder="discovery, proposal, production, delivery" variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description (English)</label>
                    <TextArea name="description" defaultValue={editingStep?.description || ''} required rows={4} variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description (Arabic)</label>
                    <TextArea name="descriptionAr" defaultValue={editingStep?.descriptionAr || ''} rows={4} dir="rtl" variant="secondary" />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Step</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
