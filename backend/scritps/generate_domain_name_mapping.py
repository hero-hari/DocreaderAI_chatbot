# scripts/generate_domain_name_mapping.py
import json

# Load domains.json
with open('../data/domains.json', 'r') as f:
    data = json.load(f)

# Load folder_ids.json
with open('../data/folder_ids.json', 'r') as f:
    folder_ids = json.load(f)

# Generate mapping
mapping = {}
folder_names = set(folder_ids.keys())

for domain in data['domains']:
    domain_id = domain['id']
    domain_name = domain['name']
    
    # Try to find matching folder name
    possible_names = [
        domain_name,
        domain_name.replace(' ', '_'),
        domain_name.replace(' & ', '_and_'),
        domain_name.replace(' ', '_').replace('&', '_')
    ]
    
    matched = None
    for name in possible_names:
        if name in folder_names:
            matched = name
            break
    
    if not matched:
        # Try case-insensitive
        for folder_name in folder_names:
            if folder_name.lower().replace('_', '') == domain_name.lower().replace(' ', '').replace('&', ''):
                matched = folder_name
                break
    
    if matched:
        mapping[domain_id] = matched
    else:
        print(f"❌ No match found for: {domain_id} ({domain_name})")

# Print result
print("DOMAIN_NAME_MAPPING = {")
for domain_id, folder_name in mapping.items():
    print(f'    "{domain_id}": "{folder_name}",')
print("}")

print(f"\n✅ Mapped {len(mapping)} out of {len(data['domains'])} domains")
