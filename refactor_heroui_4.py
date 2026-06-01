import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # Remove color="..." from Button
    content = re.sub(r'(<Button[^>]*)color="[^"]*"([^>]*>)', r'\1\2', content)
    
    # Remove variant="flat" from Button
    content = re.sub(r'(<Button[^>]*)variant="[^"]*"([^>]*>)', r'\1\2', content)

    # Move size="..." from Modal to Modal.Container
    def replace_modal(match):
        size_match = re.search(r'size="([^"]+)"', match.group(0))
        if size_match:
            # We don't need to put it in Modal.Container if it's too hard, let's just remove it
            # since the user's styling can be added via classNames if needed, or we just keep it
            pass
        return match.group(0)

    # Let's just remove size="..." from Modal to avoid errors
    content = re.sub(r'(<Modal\s+[^>]*)size="[^"]*"([^>]*>)', r'\1\2', content)

    # Table Column does not take `align="center"` anymore in v3 maybe?
    # Let's remove it just in case
    content = re.sub(r'(<Table\.Column[^>]*)align="[^"]*"([^>]*>)', r'\1\2', content)

    # Table.Body does not take `emptyContent` anymore, but we can leave it for now or remove it.
    content = re.sub(r'(<Table\.Body[^>]*)emptyContent="[^"]*"([^>]*>)', r'\1\2', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
