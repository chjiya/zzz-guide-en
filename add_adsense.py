#!/usr/bin/env python3
"""Add Google AdSense code before </head> in all HTML files."""

import os
import glob

ADSENSE = '''<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3857626678274044"
     crossorigin="anonymous"></script>'''

ROOT = "/Users/chenjiyan/workspace/zzz-guide-en"

# Find all HTML files in root and guides/ recursively
files = []
files.append(os.path.join(ROOT, "index.html"))
files.extend(glob.glob(os.path.join(ROOT, "guides", "**", "*.html"), recursive=True))

count = 0
for fpath in sorted(files):
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if ADSENSE in content:
        print(f"SKIP (already has AdSense): {fpath}")
        continue

    new_content = content.replace("</head>", f"{ADSENSE}\n</head>", 1)
    
    if new_content == content:
        print(f"SKIP (no </head> tag): {fpath}")
        continue

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"OK: {fpath}")
    count += 1

print(f"\nDone! {count} files modified.")
