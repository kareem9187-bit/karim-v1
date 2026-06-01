import { getEmails, getFolderCounts } from './actions';
import MailClient from './mail-client';

export const metadata = { title: 'Mail | Admin' };

export default async function MailPage() {
  const [inboxEmails, folderCounts] = await Promise.all([
    getEmails('inbox'),
    getFolderCounts(),
  ]);

  return (
    <MailClient
      initialEmails={inboxEmails}
      initialFolder="inbox"
      folderCounts={folderCounts}
    />
  );
}
