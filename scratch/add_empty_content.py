import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

# Regex to find: <Table.Body items={...}> and replace with <Table.Body items={...} emptyContent="No data">
pattern = re.compile(r'<Table\.Body\s+items=\{([^\}]+)\}\s*>', re.DOTALL)

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            if pattern.search(content):
                # Replace start
                new_content = pattern.sub(r'<Table.Body items={\1} emptyContent="No records found">', content)
                
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Fixed emptyContent in {path}")
