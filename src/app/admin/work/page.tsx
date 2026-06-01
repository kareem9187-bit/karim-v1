'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table, TextArea } from "@heroui/react";
import { getAllWorks, upsertWork, deleteWork } from './actions';
import toast from 'react-hot-toast';

export default function WorksAdminPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingWork, setEditingWork] = useState<any | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    setIsLoading(true);
    const data = await getAllWorks();
    setWorks(data || []);
    setIsLoading(false);
  };

  const handleEdit = (work: any) => {
    setEditingWork(work);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setEditingWork(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    const res = await deleteWork(id);
    if (res.success) {
      toast.success('Portfolio item deleted');
      loadWorks();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingWork?.id) {
      formData.append('id', editingWork.id);
    }
    
    const res = await upsertWork(formData);
    
    if (!res || !res.success) {
      toast.error('Failed to save portfolio item');
    } else {
      toast.success('Portfolio item saved successfully');
      loadWorks();
      setIsOpen(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolio / Work</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add New Work
        </Button>
      </div>

      <Card >
        <Card.Content className="p-0">
          {!works || works.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table 
            aria-label="Works" 
            
          >
            <Table.Header>
              <Table.Column>ORDER</Table.Column>
              <Table.Column>TITLE</Table.Column>
              <Table.Column>CATEGORY</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column >ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body items={works}>
              {(item: any) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.order}</Table.Cell>
                  <Table.Cell>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.slug}</div>
                  </Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col gap-1">
                      <span className={`w-fit px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {item.active ? 'Active' : 'Inactive'}
                      </span>
                      {item.featured && <span className="w-fit px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Featured</span>}
                      {item.comingSoon && <span className="w-fit px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">Coming Soon</span>}
                    </div>
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
              <Modal.Header>{editingWork ? 'Edit Work' : 'Add New Work'}</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Order</label><Input 
                    name="order" 
                     
                    type="number"
                    defaultValue={editingWork?.order || 0} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Slug (URL)</label><Input 
                    name="slug" 
                     
                    defaultValue={editingWork?.slug} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="md:col-span-2 flex flex-wrap gap-6 px-2 py-2 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(255,255,255,0.02)]">
                    <Switch name="active" defaultSelected={editingWork?.active !== false} value="true">
                      Active
                    </Switch>
                    <Switch name="featured" defaultSelected={editingWork?.featured === true} value="true">
                      Featured Work
                    </Switch>
                    <Switch name="comingSoon" defaultSelected={editingWork?.comingSoon === true} value="true">
                      Coming Soon
                    </Switch>
                  </div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (English)</label><Input 
                    name="title" 
                     
                    defaultValue={editingWork?.title} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (Arabic)</label><Input 
                    name="titleAr" 
                     
                    defaultValue={editingWork?.titleAr} 
                    dir="rtl"
                    variant="secondary"
                    
                   /></div>

                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category (English)</label>
                    <select 
                      name="category" 
                      defaultValue={editingWork?.category || "Video Editing"} 
                      required 
                      className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm ring-offset-neutral-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    >
                      <option value="Video Editing">Video Editing</option>
                      <option value="Cinematography">Cinematography</option>
                      <option value="Social Content">Social Content</option>
                      <option value="Documentary & Brand">Documentary & Brand</option>
                      <option value="Training & Mentorship">Training & Mentorship</option>
                      <option value="Motion & Graphics">Motion & Graphics</option>
                    </select>
                  </div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Category (Arabic)</label><Input 
                    name="categoryAr" 
                     
                    defaultValue={editingWork?.categoryAr} 
                    dir="rtl"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Description (English)</label><TextArea 
                    name="description" 
                     
                    defaultValue={editingWork?.description} 
                    rows={3}
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Description (Arabic)</label><TextArea 
                    name="descriptionAr" 
                     
                    defaultValue={editingWork?.descriptionAr} 
                    rows={3}
                    dir="rtl"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail Image URL</label><Input 
                    name="thumbnail" 
                     
                    defaultValue={editingWork?.thumbnail} 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Video URL (Vimeo/YouTube)</label><Input 
                    name="videoUrl" 
                     
                    defaultValue={editingWork?.videoUrl} 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="ghost" onPress={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Save Work</Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
