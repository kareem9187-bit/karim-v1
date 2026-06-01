import os
import re

directories = [
    'src/app/admin',
    'src/app/providers.tsx'
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    if 'providers.tsx' in filepath:
        content = content.replace("import { HeroUIProvider } from '@heroui/react';", "")
        content = content.replace("<HeroUIProvider>", "")
        content = content.replace("</HeroUIProvider>", "")

    # Imports
    content = re.sub(r'import\s*{([^}]+)}\s*from\s*[\'"]@heroui/react[\'"];',
                     lambda m: 'import { ' + ', '.join(sorted(list(set([
                         c.strip() for c in m.group(1).split(',')
                         if c.strip() and c.strip() not in [
                             'CardBody', 'CardHeader', 'CardFooter',
                             'ModalContent', 'ModalHeader', 'ModalBody', 'ModalFooter', 'useDisclosure',
                             'TableHeader', 'TableColumn', 'TableBody', 'TableRow', 'TableCell'
                         ]
                     ])))) + ' } from "@heroui/react";', content)

    # Replace Textarea with TextArea
    content = content.replace('Textarea', 'TextArea')

    # Replace useDisclosure
    if 'useDisclosure' in original_content:
        # Add useState if not exists
        if 'useState' not in content:
            if 'import React' in content or 'import { ' in content and 'react' in content.lower():
                pass # Try to inject simply
                content = content.replace('import {', 'import { useState,', 1)
            else:
                content = "import { useState } from 'react';\n" + content
        
        content = re.sub(r'const\s*{\s*isOpen\s*,\s*onOpen\s*,\s*onOpenChange\s*}\s*=\s*useDisclosure\(\);?', 'const [isOpen, setIsOpen] = useState(false);', content)
        content = content.replace('onOpen()', 'setIsOpen(true)')
        content = content.replace('onOpenChange={onOpenChange}', 'onOpenChange={setIsOpen}')

    # Replace Card
    content = content.replace('<CardBody', '<Card.Content')
    content = content.replace('</CardBody>', '</Card.Content>')
    content = content.replace('<CardHeader', '<Card.Header')
    content = content.replace('</CardHeader>', '</Card.Header>')
    content = content.replace('<CardFooter', '<Card.Footer')
    content = content.replace('</CardFooter>', '</Card.Footer>')

    # Replace Modal
    content = content.replace('<ModalContent>', '<Modal.Backdrop /><Modal.Container><Modal.Dialog>')
    content = content.replace('<ModalContent', '<Modal.Backdrop /><Modal.Container><Modal.Dialog')
    content = content.replace('</ModalContent>', '</Modal.Dialog></Modal.Container>')
    content = content.replace('<ModalHeader', '<Modal.Header')
    content = content.replace('</ModalHeader>', '</Modal.Header>')
    content = content.replace('<ModalBody', '<Modal.Body')
    content = content.replace('</ModalBody>', '</Modal.Body>')
    content = content.replace('<ModalFooter', '<Modal.Footer')
    content = content.replace('</ModalFooter>', '</Modal.Footer>')

    # Replace Table
    content = content.replace('<TableHeader', '<Table.Header')
    content = content.replace('</TableHeader>', '</Table.Header>')
    content = content.replace('<TableColumn', '<Table.Column')
    content = content.replace('</TableColumn>', '</Table.Column>')
    content = content.replace('<TableBody', '<Table.Body')
    content = content.replace('</TableBody>', '</Table.Body>')
    content = content.replace('<TableRow', '<Table.Row')
    content = content.replace('</TableRow>', '</Table.Row>')
    content = content.replace('<TableCell', '<Table.Cell')
    content = content.replace('</TableCell>', '</Table.Cell>')
    
    # Fix import empty block
    content = content.replace('import {  } from "@heroui/react";', '')

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

process_file('src/app/providers.tsx')
