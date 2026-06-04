'use client';

import { useEffect, useState } from 'react';
import { createOverlayState } from '@/lib/overlay-state';
import { Button, Card, Input, Modal, Switch, Table, TextArea, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { getAllServices, upsertService, deleteService } from './actions';
import toast from 'react-hot-toast';

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<any | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const modalState = createOverlayState(isOpen, setIsOpen);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const data = await getAllServices();
    setServices(data || []);
    setIsLoading(false);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const res = await deleteService(id);
    if (res.success) {
      toast.success('Service deleted');
      loadServices();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingService?.id) {
      formData.append('id', editingService.id);
    }

    const res = await upsertService(formData);

    if (!res || !res.success) {
      toast.error('Failed to save service');
    } else {
      toast.success('Service saved successfully');
      loadServices();
      setIsOpen(false); // Close modal
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add New Service
        </Button>
      </div>

      <Card >
        <Card.Content className="p-0">
          {!services || services.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table>
              <Table.Content aria-label="Services">
            <TableHeader>
              <TableColumn>ORDER</TableColumn>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn >ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={services}>
              {(item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.order}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
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

      <Modal state={modalState}  >
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSubmit} className="space-y-8">
              <Modal.Header>{editingService ? 'Edit Service' : 'Add New Service'}</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Order</label><Input
                    name="order"

                    type="number"
                    defaultValue={editingService?.order || 0}
                    required
                    variant="secondary"

                   /></div>
                  <div className="flex items-center px-2">
                    <Switch name="active" defaultSelected={editingService?.active !== false} value="true">
                      Active
                    </Switch>
                  </div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (English)</label><Input
                    name="title"

                    defaultValue={editingService?.title}
                    required
                    variant="secondary"

                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (Arabic)</label><Input
                    name="titleAr"

                    defaultValue={editingService?.titleAr}
                    dir="rtl"
                    variant="secondary"

                   /></div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Description (English)</label><TextArea
                    name="description"

                    defaultValue={editingService?.description}
                    required
                    rows={3}
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Description (Arabic)</label><TextArea
                    name="descriptionAr"

                    defaultValue={editingService?.descriptionAr}
                    rows={3}
                    dir="rtl"
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>

                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Icon Name or SVG</label><Input
                    name="icon"

                    defaultValue={editingService?.icon}
                    className="md:col-span-2"
                    variant="secondary"

                   /></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Service</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
