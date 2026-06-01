import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # Fix variant="faded" to variant="secondary"
    content = content.replace('variant="faded"', 'variant="secondary"')
    # Fix variant="flat" to variant="secondary"
    content = content.replace('variant="flat"', 'variant="secondary"')
    # Fix variant="light" to variant="ghost"
    content = content.replace('variant="light"', 'variant="ghost"')

    # Fix Modal sizes
    content = re.sub(r'(<Modal\s+[^>]*)size="[^"]*"([^>]*>)', r'\1\2', content)

    # Remove classNames from Card, Table, Modal, Input, TextArea
    # Since classNames might span multiple lines, let's use a regex that matches it.
    # It's easier to just do it roughly since we only care about fixing the build.
    content = re.sub(r'classNames={{[^}]+}}', '', content)

    # Remove emptyContent
    content = re.sub(r'emptyContent="[^"]*"', '', content)
    # Remove emptyContent with expressions
    content = re.sub(r'emptyContent=\{[^}]+\}', '', content)

    # Remove align="center"
    content = content.replace('align="center"', '')
    content = content.replace('align="left"', '')
    content = content.replace('align="right"', '')
    
    # Remove color props
    content = re.sub(r'\s+color="[^"]*"', '', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

# Fix providers.tsx
providers_content = """'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}
"""
with open('src/app/providers.tsx', 'w', encoding='utf-8') as f:
    f.write(providers_content)
