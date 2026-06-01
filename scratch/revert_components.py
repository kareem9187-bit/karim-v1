import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

table_tags = ["Header", "Column", "Body", "Row", "Cell"]
modal_tags = ["Content", "Header", "Body", "Footer"]

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            new_content = content
            
            for tag in table_tags:
                new_content = re.sub(rf'<Table{tag}\b', rf'<Table.{tag}', new_content)
                new_content = re.sub(rf'</Table{tag}>', rf'</Table.{tag}>', new_content)
                
            for tag in modal_tags:
                new_content = re.sub(rf'<Modal{tag}\b', rf'<Modal.{tag}', new_content)
                new_content = re.sub(rf'</Modal{tag}>', rf'</Modal.{tag}>', new_content)

            import_pattern = re.compile(r'import\s+\{([^}]+)\}\s+from\s+["\']@heroui/react["\']')
            match = import_pattern.search(new_content)
            if match:
                imports_str = match.group(1)
                imports_list = [i.strip() for i in imports_str.split(',')]
                
                # Remove ModalContent, ModalHeader, TableHeader, etc.
                remove_list = [f"Table{t}" for t in table_tags] + [f"Modal{t}" for t in modal_tags]
                imports_list = [i for i in imports_list if i not in remove_list]
                
                # Ensure Table and Modal are imported if used
                if "<Table" in new_content and "Table" not in imports_list:
                    imports_list.append("Table")
                if "<Modal" in new_content and "Modal" not in imports_list:
                    imports_list.append("Modal")
                    
                imports_list = [i for i in imports_list if i]
                
                new_import_str = f"import {{ {', '.join(sorted(set(imports_list)))} }} from \"@heroui/react\""
                new_content = new_content[:match.start()] + new_import_str + new_content[match.end():]
                
            if new_content != content:
                with open(path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                print(f"Reverted components in {path}")
