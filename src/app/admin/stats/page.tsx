'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table } from "@heroui/react";
import { getStats, upsertStat, deleteStat } from './actions';
import toast from 'react-hot-toast';

export default function StatsAdminPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getStats();
    setStats(data || []);
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
    if (!confirm('Are you sure you want to delete this stat?')) return;
    const res = await deleteStat(id);
    if (res.success) {
      toast.success('Stat deleted');
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingItem?.id) {
      formData.append('id', editingItem.id);
    }
    
    const res = await upsertStat(formData);
    
    if (!res || !res.success) {
      toast.error('Failed to save stat');
    } else {
      toast.success('Stat saved successfully');
      loadData();
      setIsOpen(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Global Stats</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add Stat
        </Button>
      </div>

      <Card>
        <Card.Content className="p-0">
          {!stats || stats.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table aria-label="Global Stats">
              <Table.Header>
                <Table.Column>ORDER</Table.Column>
                <Table.Column>NUMBER / VALUE</Table.Column>
                <Table.Column>LABEL</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>
              <Table.Body items={stats}>
                {(item: any) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.order}</Table.Cell>
                    <Table.Cell className="font-medium text-xl text-blue-400">{item.number}</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span>{item.label}</span>
                        <span className="text-xs text-gray-500">{item.labelAr}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="secondary" onPress={() => handleEdit(item)}>Edit</Button>
                        <Button size="sm" variant="secondary" onPress={() => handleDelete(item.id)}>Delete</Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          )}
        </Card.Content>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header>{editingItem ? 'Edit Stat' : 'Add Stat'}</Modal.Header>
              <Modal.Body className="py-6">
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
                    <label className="block text-sm font-medium text-gray-300 mb-1">Number / Value</label>
                    <Input 
                      name="number" 
                      defaultValue={editingItem?.number} 
                      required 
                      variant="secondary"
                      placeholder="e.g. 15+, 100K"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Label (English)</label>
                    <Input 
                      name="label" 
                      defaultValue={editingItem?.label} 
                      required 
                      variant="secondary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Label (Arabic)</label>
                    <Input 
                      name="labelAr" 
                      defaultValue={editingItem?.labelAr} 
                      dir="rtl"
                      variant="secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Icon SVG / URL (Optional)</label>
                    <Input 
                      name="icon" 
                      defaultValue={editingItem?.icon} 
                      variant="secondary"
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Stat</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
