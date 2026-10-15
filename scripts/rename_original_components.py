import json
from pathlib import Path

mapping_path = Path(__file__).parent.parent / "builtin/assets/Component_Translations.json"
translations = json.loads(mapping_path.read_text(encoding="utf-8"))

for entry in translations:
    for name, component in entry.items():
        if name == "id":
            continue
        original = Path(component["orginal"])
        original.rename(original.with_name(original.name + ".old"))
