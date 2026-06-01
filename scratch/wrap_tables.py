import os
import re

admin_dir = r"d:\karim\karim-portfolio\src\app\admin"

for root, dirs, files in os.walk(admin_dir):
    for f in files:
        if f.endswith(".tsx"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                content = file.read()
            
            # Find the items variable from <Table.Body items={varName}>
            match = re.search(r'<Table\.Body\s+items=\{([^\}]+)\}', content)
            if match:
                items_var = match.group(1)
                
                # Check if it's already wrapped
                if f"{{ {items_var}.length === 0 ?" in content or f"{{{items_var}.length === 0 ?" in content or f"{{{items_var}?.length === 0 ?" in content:
                    continue
                
                # Find <Table ...> and </Table>
                table_start_match = re.search(r'(<Table\b[^\>]*>)', content)
                table_end_match = re.search(r'(</Table>)', content)
                
                if table_start_match and table_end_match:
                    start_idx = table_start_match.start()
                    end_idx = table_end_match.end()
                    
                    table_html = content[start_idx:end_idx]
                    
                    wrapped_html = f"""{{!{items_var} || {items_var}.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-black/20 rounded-lg border border-[rgba(255,255,255,0.05)] mt-4">
              No records found.
            </div>
          ) : (
            {table_html}
          )}}"""
                    
                    new_content = content[:start_idx] + wrapped_html + content[end_idx:]
                    with open(path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    print(f"Wrapped Table in {path} with {items_var}")
