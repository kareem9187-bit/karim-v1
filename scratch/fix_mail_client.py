import os
import re

path = r"d:\karim\karim-portfolio\src\app\admin\mail\mail-client.tsx"

with open(path, "r", encoding="utf-8") as file:
    content = file.read()

# Replace <ModalContent> if it appears multiple times on one line
content = re.sub(r'<ModalContent>[\s\n]*<ModalContent>[\s\n]*<ModalContent>', '<ModalContent>', content)
content = re.sub(r'<ModalContent>[\s\n]*<ModalContent>', '<ModalContent>', content)

# Remove the weird closing tags if they exist
content = content.replace('</Modal.Dialog>', '')
content = content.replace('</Modal.Container>', '')

with open(path, "w", encoding="utf-8") as file:
    file.write(content)
print(f"Fixed mail-client.tsx")
