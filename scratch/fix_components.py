import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

table_tags = ["Header", "Column", "Body", "Row", "Cell"]
modal_tags = ["Backdrop", "Container", "Dialog", "Header", "Body", "Footer"]

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            new_content = content
            
            # Replace Table dot notation
            for tag in table_tags:
                new_content = re.sub(rf'<Table\.{tag}\b', rf'<Table{tag}', new_content)
                new_content = re.sub(rf'</Table\.{tag}>', rf'</Table{tag}>', new_content)
            
            # Replace Modal dot notation EXCEPT Backdrop/Container/Dialog which we remove
            # Actually HeroUI uses ModalContent, ModalHeader, ModalBody, ModalFooter
            new_content = re.sub(r'<Modal\.Backdrop\s*/>|<Modal\.Container>|<Modal\.Dialog>', '<ModalContent>', new_content)
            new_content = re.sub(r'</Modal\.Dialog></Modal\.Container>', '</ModalContent>', new_content)
            
            new_content = re.sub(r'<Modal\.Header\b', r'<ModalHeader', new_content)
            new_content = re.sub(r'</Modal\.Header>', r'</ModalHeader>', new_content)
            
            new_content = re.sub(r'<Modal\.Body\b', r'<ModalBody', new_content)
            new_content = re.sub(r'</Modal\.Body>', r'</ModalBody>', new_content)
            
            new_content = re.sub(r'<Modal\.Footer\b', r'<ModalFooter', new_content)
            new_content = re.sub(r'</Modal\.Footer>', r'</ModalFooter>', new_content)

            # Fix imports for HeroUI
            # Find the import line: import { ..., Table, ... } from "@heroui/react"
            # and ensure TableHeader, TableColumn, etc are imported
            import_pattern = re.compile(r'import\s+\{([^}]+)\}\s+from\s+["\']@heroui/react["\']')
            match = import_pattern.search(new_content)
            if match:
                imports_str = match.group(1)
                imports_list = [i.strip() for i in imports_str.split(',')]
                
                required_table = ['Table', 'TableHeader', 'TableColumn', 'TableBody', 'TableRow', 'TableCell']
                if "Table" in imports_list or any(t in new_content for t in required_table):
                    for req in required_table:
                        if req not in imports_list and f"<Table" in new_content:
                            imports_list.append(req)
                
                required_modal = ['Modal', 'ModalContent', 'ModalHeader', 'ModalBody', 'ModalFooter']
                if "Modal" in imports_list or any(m in new_content for m in required_modal):
                    for req in required_modal:
                        if req not in imports_list and f"<Modal" in new_content:
                            imports_list.append(req)
                
                # Cleanup empty strings
                imports_list = [i for i in imports_list if i]
                
                new_import_str = f"import {{ {', '.join(sorted(set(imports_list)))} }} from \"@heroui/react\""
                new_content = new_content[:match.start()] + new_import_str + new_content[match.end():]
                
            if new_content != content:
                with open(path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                print(f"Fixed components in {path}")
