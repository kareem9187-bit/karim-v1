import os
import re

def process_mail_client(content):
    # Fix Avatar name -> remove it or change to alt
    content = re.sub(r'(<Avatar[^>]*)name="[^"]*"([^>]*>)', r'\1\2', content)
    content = re.sub(r'(<Avatar[^>]*)name=\{[^\}]*\}([^>]*>)', r'\1\2', content)
    
    # Remove onRowAction
    content = re.sub(r'onRowAction=\{[^}]+\}', '', content)
    
    # Fix disabled -> isDisabled
    content = content.replace('disabled={isPending}', 'isDisabled={isPending}')
    
    return content

def process_availability(content):
    # Fix onOpen
    content = content.replace('onPress={onOpen}', 'onPress={() => setIsOpen(true)}')
    
    # Fix Input type="date" label
    def replace_input_label(match):
        before_label = match.group(1)
        label_text = match.group(2)
        after_label = match.group(3)
        return f'<div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">{label_text}</label><Input{before_label}{after_label} /></div>'

    content = re.sub(r'<Input([^>]*)label="([^"]+)"([^>]*)/>', replace_input_label, content)
    return content

with open('src/app/admin/mail/mail-client.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
with open('src/app/admin/mail/mail-client.tsx', 'w', encoding='utf-8') as f:
    f.write(process_mail_client(content))

with open('src/app/admin/availability/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
with open('src/app/admin/availability/page.tsx', 'w', encoding='utf-8') as f:
    f.write(process_availability(content))
