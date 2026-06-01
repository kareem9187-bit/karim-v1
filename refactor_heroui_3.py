import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    content = content.replace("if (res.error) {", "if (!res || !res.success) {")
    content = content.replace("if (res?.error) {", "if (!res || !res.success) {")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
