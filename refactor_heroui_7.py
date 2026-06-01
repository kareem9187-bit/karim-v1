import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # Fix isRequired to required
    content = content.replace('isRequired', 'required')
    # Fix minRows to rows
    content = content.replace('minRows', 'rows')
    # Fix onOpen to () => setIsOpen(true) in mail-client.tsx only if onOpen exists
    if 'mail-client.tsx' in filepath:
        content = content.replace('onPress={onOpen}', 'onPress={() => setIsOpen(true)}')
        content = content.replace('<Avatar name=', '<Avatar ')
        content = content.replace('selectionMode="single"', '')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

