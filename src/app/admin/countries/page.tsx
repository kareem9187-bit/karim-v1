'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import toast from 'react-hot-toast';
import { deleteCountry, getCountries, upsertCountry } from './actions';

export default function CountriesAdminPage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [editingCountry, setEditingCountry] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadCountries = async () => {
    setIsLoading(true);
    setCountries((await getCountries()) || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingCountry?.id) formData.append('id', editingCountry.id);
    const res = await upsertCountry(formData);
    if (res.success) {
      toast.success('Country saved');
      setIsOpen(false);
      loadCountries();
    } else {
      toast.error('Failed to save country');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this country?')) return;
    const res = await deleteCountry(id);
    if (res.success) {
      toast.success('Country deleted');
      loadCountries();
    }
  };

  if (isLoading) return <div className="">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Countries</h1>
        <Button onPress={() => { setEditingCountry(null); setIsOpen(true); }} className="bg-blue-600">
          Add Country
        </Button>
      </div>

      <Card>
        <Card.Content className="p-0">
          {countries.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No countries yet.</div>
          ) : (
            <Table>
              <Table.Content aria-label="Countries">
                <TableHeader>
                  <TableColumn>COUNTRY</TableColumn>
                  <TableColumn>CODE</TableColumn>
                  <TableColumn>HOME</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody items={countries}>
                  {(item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.flag ? `${item.flag} ` : ''}{item.name}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.isHome ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button size="sm" variant="secondary" onPress={() => { setEditingCountry(item); setIsOpen(true); }}>Edit</Button>
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

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSubmit} className="space-y-8">
              <Modal.Header>{editingCountry ? 'Edit Country' : 'Add Country'}</Modal.Header>
              <Modal.Body className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name (English)</label>
                    <Input name="name" defaultValue={editingCountry?.name || ''} required variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name (Arabic)</label>
                    <Input name="nameAr" defaultValue={editingCountry?.nameAr || ''} dir="rtl" variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Country Code</label>
                    <Input name="code" defaultValue={editingCountry?.code || ''} required variant="secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Flag</label>
                    <Input name="flag" defaultValue={editingCountry?.flag || ''} variant="secondary" />
                  </div>
                  <div className="flex items-center px-2">
                    <Switch name="isHome" defaultSelected={editingCountry?.isHome === true} value="true">Home country</Switch>
                  </div>
                  <div className="flex items-center px-2">
                    <Switch name="active" defaultSelected={editingCountry?.active !== false} value="true">Active</Switch>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Country</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
