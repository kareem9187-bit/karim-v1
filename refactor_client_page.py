import re

file_path = "d:/karim/karim-portfolio/src/app/client-page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Containers
content = re.sub(r'className="container"', r'className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8"', content)

# 2. Grids
# List of known grid classes in client-page.tsx:
grid_classes = [
    "home-svc-grid", "process-grid", "exp-grid", "services-grid",
    "video-reviews-grid", "about-grid", "training-stats", "training-topics"
]

def replace_grid(m):
    original = m.group(1)
    if "grid-cols" in original:
        return f'className="{original}"'
    return f'className="{original} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"'

for gc in grid_classes:
    content = re.sub(rf'className="([^"]*{gc}[^"]*)"', replace_grid, content)

# 3. Flex-row to flex-col md:flex-row
# Known flex-row containers (or just items that are horizontally laid out)
flex_classes = [
    "home-cta-actions", "hero-ctas", "top-actions", "nav-actions"
]

def replace_flex(m):
    original = m.group(1)
    if "flex-col" in original:
        return f'className="{original}"'
    return f'className="{original} flex flex-col md:flex-row gap-4"'

for fc in flex_classes:
    content = re.sub(rf'className="([^"]*{fc}[^"]*)"', replace_flex, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated client-page.tsx successfully.")
