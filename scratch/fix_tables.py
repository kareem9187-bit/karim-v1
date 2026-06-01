import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

# Regex to find:
# <Table.Body >
#   {VARNAME.map((item) => (
pattern = re.compile(r'<Table\.Body\s*>\s*\{(\w+)\.map\(\(item\)\s*=>\s*\(', re.DOTALL)

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f == "page.tsx":
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            if pattern.search(content):
                # Replace start
                new_content = pattern.sub(r'<Table.Body items={\1}>\n              {(item: any) => (', content)
                # Replace end
                new_content = new_content.replace('))}\n            </Table.Body>', ')}\n            </Table.Body>')
                
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Fixed {path}")
