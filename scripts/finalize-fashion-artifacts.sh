#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="${1:-$SCRIPT_DIR/v1}"
MODEL="$ROOT/model.pt"
MANIFEST="$ROOT/manifest.json"
TEMPLATE="$ROOT/manifest.template.json"

if [[ ! -f "$MODEL" ]]; then
  echo "Missing $MODEL"
  echo "Copy best_dinov2_vitb14.pt to $MODEL first."
  exit 1
fi

MODEL_SHA="$(sha256sum "$MODEL" | awk '{print $1}')"
sed "s/<MODEL_PT_SHA256>/$MODEL_SHA/g" "$TEMPLATE" > "$MANIFEST"

echo "model.pt sha256: $MODEL_SHA"
echo "Wrote $MANIFEST"
