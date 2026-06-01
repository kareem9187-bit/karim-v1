import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    content = content.replace("onOpenChange();", "setIsOpen(false);")
    content = content.replace("{(onClose) => (", "{({ close: onClose }: any) => (")
    content = content.replace("{(onClose: any) => (", "{({ close: onClose }: any) => (")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/app/admin'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
