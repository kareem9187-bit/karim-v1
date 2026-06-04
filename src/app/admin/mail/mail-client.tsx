'use client';

import { useState, useTransition, useEffect } from 'react';
import { createOverlayState } from '@/lib/overlay-state';
import { Avatar, Button, Input, Modal, Table, TextArea, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { sendEmail, getEmails } from './actions';
import toast from 'react-hot-toast';

type Email = {
  id: string;
  fromName: string | null;
  fromEmail: string;
  subject: string;
  body: string;
  bodyText: string | null;
  createdAt: Date;
  read: boolean | null;
  starred: boolean | null;
  folder: string | null;
};

type MailClientProps = {
  initialEmails: Email[];
  initialFolder: string;
  folderCounts: Record<string, { total: number; unread: number }>;
};

export default function MailClient({ initialEmails, initialFolder, folderCounts }: MailClientProps) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [activeFolder, setActiveFolder] = useState(initialFolder);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const modalState = createOverlayState(isOpen, setIsOpen);
  const [isPending, startTransition] = useTransition();

  // Compose state
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // Fetch emails when folder changes
  useEffect(() => {
    if (activeFolder !== initialFolder) {
      startTransition(async () => {
        const result = await getEmails(activeFolder);
        setEmails(result as Email[]);
        setSelectedEmail(null);
      });
    }
  }, [activeFolder, initialFolder]);

  const handleSend = async () => {
    if (!to || !subject || !body) {
      toast.error('Please fill in all fields');
      return;
    }

    startTransition(async () => {
      const res = await sendEmail({ to, subject, body });
      if (res.success) {
        toast.success('Email sent successfully');
        setIsOpen(false);
        setTo('');
        setSubject('');
        setBody('');
        // Refresh if we are in sent folder
        if (activeFolder === 'sent') {
          const result = await getEmails('sent');
          setEmails(result as Email[]);
        }
      } else {
        toast.error('Failed to send email');
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex h-[calc(100vh-100px)] bg-[#04060a] text-white">
      {/* Sidebar */}
      <div className="w-[250px] border-r border-[rgba(255,255,255,0.06)] p-4 flex flex-col gap-2">
        <Button
          className="w-full mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold"
          onPress={() => setIsOpen(true)}
        >
          Compose Email
        </Button>

        {['inbox', 'sent', 'starred', 'drafts', 'trash'].map((folder) => {
          const unreadCount = folderCounts[folder]?.unread || 0;
          return (
            <div
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                activeFolder === folder
                  ? 'bg-[rgba(255,255,255,0.1)] text-white'
                  : 'text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
              }`}
            >
              <span className="capitalize">{folder}</span>
              {unreadCount > 0 && (
                <span className="text-xs bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded-full text-white font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[rgba(255,255,255,0.06)]">
              <Button isIconOnly variant="ghost" onPress={() => setSelectedEmail(null)}>
                ←
              </Button>
              <div>
                <h2 className="text-2xl font-semibold">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <Avatar  size="sm" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{selectedEmail.fromName || selectedEmail.fromEmail}</span>
                    <span className="text-xs text-gray-400">&lt;{selectedEmail.fromEmail}&gt;</span>
                  </div>
                </div>
              </div>
              <div className="ml-auto text-sm text-gray-400">
                {new Date(selectedEmail.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedEmail.bodyText || selectedEmail.body}
            </div>
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
              <Button variant="secondary" onPress={() => {
                setTo(selectedEmail.fromEmail);
                setSubject(`Re: ${selectedEmail.subject}`);
                setIsOpen(true);
              }}>
                Reply
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto relative p-4">
            {isPending && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                <span className="text-sm text-gray-400">Loading...</span>
              </div>
            )}
            {!emails || emails.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            <Table className="h-full">
              <Table.Content aria-label="Emails list">
              <TableHeader>
                <TableColumn>SENDER</TableColumn>
                <TableColumn>SUBJECT</TableColumn>
                <TableColumn width={100}>DATE</TableColumn>
              </TableHeader>
              <TableBody items={emails}>
                {(email: any) => (
                  <TableRow key={email.id} className="group cursor-pointer hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {!email.read && activeFolder === 'inbox' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                        <span className={`truncate ${!email.read && activeFolder === 'inbox' ? 'font-semibold text-white' : 'text-gray-300'}`}>
                          {email.fromName || email.fromEmail}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`truncate block max-w-md ${!email.read && activeFolder === 'inbox' ? 'font-semibold text-white' : 'text-gray-400'}`}>
                        {email.subject}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(email.createdAt)}
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              </Table.Content>
            </Table>
          )}
            {emails.length === 0 && !isPending && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-gray-500">No emails in this folder.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <Modal state={modalState}>
        <Modal.Dialog>
            {({ close: onClose }: any) => (
              <>
                <Modal.Header className="border-b border-[rgba(255,255,255,0.1)]">New Message</Modal.Header>
                <Modal.Body className="py-4 gap-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">To</label>
                    <Input
                      placeholder="recipient@example.com"
                      variant="secondary"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <Input
                      placeholder="Email subject"
                      variant="secondary"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <TextArea
                      placeholder="Write your message here..."
                      rows={10}
                      variant="secondary"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="border-t border-[rgba(255,255,255,0.1)]">
                  <Button variant="ghost" onPress={onClose} isDisabled={isPending}>
                    Cancel
                  </Button>
                  <Button onPress={handleSend} className="bg-blue-600" isDisabled={isPending}>
                    {isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </Modal.Footer>
              </>
            )}

          </Modal.Dialog>
        </Modal>
    </div>
  );
}
