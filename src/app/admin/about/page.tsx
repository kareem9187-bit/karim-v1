'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Switch, Table, TextArea } from "@heroui/react";
import { getAllStoryChapters, upsertStoryChapter, deleteStoryChapter } from './actions';
import toast from 'react-hot-toast';

export default function AboutAdminPage() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingChapter, setEditingChapter] = useState<any | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    setIsLoading(true);
    const data = await getAllStoryChapters();
    setChapters(data || []);
    setIsLoading(false);
  };

  const handleEdit = (chapter: any) => {
    setEditingChapter(chapter);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setEditingChapter(null);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return;
    const res = await deleteStoryChapter(id);
    if (res.success) {
      toast.success('Chapter deleted');
      loadChapters();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingChapter?.id) {
      formData.append('id', editingChapter.id);
    }
    
    const res = await upsertStoryChapter(formData);
    
    if (!res || !res.success) {
      toast.error('Failed to save chapter');
    } else {
      toast.success('Chapter saved successfully');
      loadChapters();
      setIsOpen(false); // Close modal
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">About Chapters</h1>
        <Button onPress={handleAddNew} className="bg-blue-600">
          Add New Chapter
        </Button>
      </div>

      <Card >
        <Card.Content className="p-0">
          {!chapters || chapters.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table 
            aria-label="Story chapters" 
            
          >
            <Table.Header>
              <Table.Column>ORDER</Table.Column>
              <Table.Column>TITLE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column >ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body items={chapters}>
              {(item: any) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.order}</Table.Cell>
                  <Table.Cell className="font-medium">{item.title}</Table.Cell>
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
              <Modal.Header>{editingChapter ? 'Edit Chapter' : 'Add New Chapter'}</Modal.Header>
              <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Order</label><Input 
                    name="order" 
                     
                    type="number"
                    defaultValue={editingChapter?.order || 0} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  <div className="flex items-center gap-4 px-2">
                    <Switch name="active" defaultSelected={editingChapter?.active !== false} value="true">
                      Active
                    </Switch>
                    <Switch name="reversed" defaultSelected={editingChapter?.reversed === true} value="true">
                      Image on Left
                    </Switch>
                  </div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (English)</label><Input 
                    name="title" 
                     
                    defaultValue={editingChapter?.title} 
                    required 
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Title (Arabic)</label><Input 
                    name="titleAr" 
                     
                    defaultValue={editingChapter?.titleAr} 
                    dir="rtl"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Content (English)</label><TextArea 
                    name="text" 
                     
                    defaultValue={editingChapter?.text} 
                    rows={4}
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Content (Arabic)</label><TextArea 
                    name="textAr" 
                     
                    defaultValue={editingChapter?.textAr} 
                    rows={4}
                    dir="rtl"
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label><Input 
                    name="image" 
                     
                    defaultValue={editingChapter?.image} 
                    className="md:col-span-2"
                    variant="secondary"
                    
                   /></div>
                  
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Eyebrow Text (English)</label><Input 
                    name="eyebrow" 
                     
                    defaultValue={editingChapter?.eyebrow} 
                    variant="secondary"
                    
                   /></div>
                  <div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">Eyebrow Text (Arabic)</label><Input 
                    name="eyebrowAr" 
                     
                    defaultValue={editingChapter?.eyebrowAr} 
                    dir="rtl"
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
