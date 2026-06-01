'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table } from "@heroui/react";
import { getBrands, upsertBrand, deleteBrand } from './actions';
import toast from 'react-hot-toast';

export default function BrandsAdminPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState<any | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setIsLoading(true);
    const data = await getBrands();
    setBrands(data || []);
    setIsLoading(false);
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setEditingBrand(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    const res = await deleteBrand(id);
    if (res.success) {
      toast.success('Brand deleted');
      loadBrands();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingBrand?.id) {
      formData.append('id', editingBrand.id);
    }
    
    const res = await upsertBrand(formData);
    
    if (!res || !res.success) {
      toast.error('Failed to save brand');
    } else {
      toast.success('Brand saved successfully');
      loadBrands();
      setIsOpen(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trusted Brands</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add New Brand
        </Button>
      </div>

      <Card >
        <Card.Content className="p-0">
          {!brands || brands.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table 
            aria-label="Brands" 
            
          >
            <Table.Header>
              <Table.Column>ORDER</Table.Column>
              <Table.Column>NAME</Table.Column>
              <Table.Column>LOGO</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column >ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body items={brands}>
              {(item: any) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.order}</Table.Cell>
                  <Table.Cell className="font-medium">{item.name}</Table.Cell>
                  <Table.Cell>
                    {item.logo ? (
                      <div className="w-12 h-12 bg-[rgba(255,255,255,0.05)] rounded flex items-center justify-center">
                        <img src={item.logo} alt={item.name} className="max-w-full max-h-full object-contain p-1" />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No logo</span>
                    )}
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

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}  >
        <Modal.Dialog>
          {({ close: onClose }: any) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</Modal.Header>
              <Modal.Body className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Order</label><Input 
                    name="order" 
                     
                    type="number"
                    defaultValue={editingBrand?.order || 0} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  <div className="flex items-center px-2">
                    <Switch name="active" defaultSelected={editingBrand?.active !== false} value="true">
                      Active
                    </Switch>
                  </div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Brand Name</label><Input 
                    name="name" 
                     
                    defaultValue={editingBrand?.name} 
                    required 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Logo URL</label><Input 
                    name="logo" 
                     
                    defaultValue={editingBrand?.logo} 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">CSS Style (optional)</label><Input 
                    name="style" 
                     
                    placeholder="e.g. filter: invert(1)"
                    defaultValue={editingBrand?.style} 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Brand</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
