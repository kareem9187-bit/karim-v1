import os
import re

def fix_labels(content):
    # Regex to find <Input ... label="Something" ... /> and replace it
    # Since XML parsing with regex is tricky if it spans multiple lines, we'll try our best.
    # We look for <Input (any characters) label="Something" (any characters) />
    # But it might be self-closing or have a closing tag. Usually they are self-closing.

    def replace_input_label(match):
        full_match = match.group(0)
        before_label = match.group(1)
        label_text = match.group(2)
        after_label = match.group(3)
        return f'<div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">{label_text}</label><Input{before_label}{after_label} /></div>'

    def replace_textarea_label(match):
        full_match = match.group(0)
        before_label = match.group(1)
        label_text = match.group(2)
        after_label = match.group(3)
        return f'<div className="mb-2"><label className="block text-sm font-medium text-gray-300 mb-1">{label_text}</label><TextArea{before_label}{after_label} /></div>'

    # Match <Input ... label="..." ... /> (multiline allowed)
    content = re.sub(r'<Input([^>]*)label="([^"]+)"([^>]*)/>', replace_input_label, content)
    content = re.sub(r'<TextArea([^>]*)label="([^"]+)"([^>]*)/>', replace_textarea_label, content)
    
    return content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = fix_labels(content)
    # Also fix Button isLoading
    content = re.sub(r'(<Button[^>]*)isLoading=\{[^\}]*\}([^>]*>)', r'\1\2', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

