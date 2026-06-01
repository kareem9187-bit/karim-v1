import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            # Change Modal.Content to Modal.Dialog
            new_content = content.replace("<Modal.Content>", "<Modal.Dialog>").replace("</Modal.Content>", "</Modal.Dialog>")
            new_content = new_content.replace("<Modal.Content ", "<Modal.Dialog ")
            
            if new_content != content:
                with open(path, "w", encoding="utf-8") as file:
                    file.write(new_content)
                print(f"Replaced Modal.Content with Modal.Dialog in {path}")
