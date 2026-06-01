import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

# Regex to find: emptyContent="No records found"
pattern = re.compile(r'\s*emptyContent="No records found"')

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            if pattern.search(content):
                # Replace start
                new_content = pattern.sub('', content)
                
                if new_content != content:
                    with open(path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Removed emptyContent in {path}")
