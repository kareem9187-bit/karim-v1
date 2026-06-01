import re

with open('d:/karim/index_33.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if match:
    css = match.group(1).strip()
    with open('d:/karim/karim-portfolio/src/app/globals.css', 'w', encoding='utf-8') as f:
        f.write("@import 'tailwindcss';\n")
        f.write('@source "../../src";\n\n')
        f.write(css)
    print(f"CSS extracted: {len(css)} chars")
else:
    print("No style tags found")
