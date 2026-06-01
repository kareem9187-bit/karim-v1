import re
import math

file_path = "d:/karim/karim-portfolio/src/app/globals.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Define the variables
new_vars = """
  --color-primary: #3a7fc7;
  --color-primary-tint: rgba(58,127,199,0.15);
  --color-primary-dark: #224f81;
  --color-text-primary: #f0f3f8;
  --color-text-secondary: rgba(240,243,248,0.55);
  --color-text-muted: rgba(240,243,248,0.32);
  --color-border: rgba(255,255,255,0.1);
"""

# Inject into the first :root
content = re.sub(r'(:root\s*\{)', r'\1' + new_vars, content, count=1)
# Also inject into the second :root just in case
content = re.sub(r'(:root\s*\{(?![^}]*--color-primary))', r'\1' + new_vars, content)

# 2. Update media queries to Tailwind breakpoints
# max-width: 900px, 800px, 600px -> 768px (md)
# max-width: 1100px, 1200px -> 1024px (lg)
def snap_media(m):
    val = int(m.group(1))
    if val <= 900:
        return "@media(max-width:768px)"
    elif val <= 1200:
        return "@media(max-width:1024px)"
    return f"@media(max-width:{val}px)"

content = re.sub(r'@media\s*\(\s*max-width\s*:\s*(\d+)px\s*\)', snap_media, content)

# 3. Align spacings to 8px scale
# We'll target padding, margin, top, bottom, left, right, gap
# We should avoid replacing percentages or other units.
# Only replace (\d+)px
def snap_px(m):
    val = int(m.group(1))
    if val <= 0:
        return "0px"
    if val <= 4:
        return "4px"
    elif val <= 6:
        return "8px"
    elif val <= 12:
        return "8px"
    elif val <= 20:
        return "16px"
    elif val <= 28:
        return "24px"
    elif val <= 40:
        return "32px"
    elif val <= 56:
        return "48px"
    elif val <= 72:
        return "64px"
    elif val <= 88:
        return "80px"
    elif val <= 110:
        return "96px"
    return f"{val}px" # keep larger values like 200px, 300px etc as is (mostly sizes not padding)

def replace_spacing(m):
    prop = m.group(1)
    values = m.group(2)
    new_values = re.sub(r'\b(\d+)px\b', snap_px, values)
    return f"{prop}:{new_values};"

content = re.sub(r'(padding|margin|margin-top|margin-bottom|margin-left|margin-right|padding-top|padding-bottom|padding-left|padding-right|gap|top|bottom|left|right)\s*:\s*([^;]+);', replace_spacing, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated globals.css successfully.")
