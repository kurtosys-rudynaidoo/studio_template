#!/usr/bin/env bash
# Scaffold a new client widget app from this template into a monorepo.
#
# Usage:
#   ./scripts/scaffold-app.sh <client-slug> <widget-slug> [dest-parent]
#
# Examples:
#   ./scripts/scaffold-app.sh acme pageHeader
#   ./scripts/scaffold-app.sh acme overview ~/Documents/GitHub/acme-pp/apps
#
# Creates: ksys-<client>-<widget>/ with package name + env filename/containerId updated.

set -euo pipefail

CLIENT="${1:-}"
WIDGET="${2:-}"
DEST_PARENT="${3:-.}"

if [[ -z "$CLIENT" || -z "$WIDGET" ]]; then
  echo "Usage: $0 <client-slug> <widget-slug> [dest-parent]" >&2
  exit 1
fi

# camelCase widget id for mount / filename (pageHeader, keyStatistics)
to_camel() {
  local raw="$1"
  echo "$raw" | awk -F'[-_ ]' '{
    printf "%s", $1;
    for (i=2; i<=NF; i++) {
      if (length($i)>0) printf "%s%s", toupper(substr($i,1,1)), substr($i,2);
    }
    printf "\n";
  }'
}

WIDGET_CAMEL="$(to_camel "$WIDGET")"
FOLDER="ksys-${CLIENT}-${WIDGET_CAMEL}"
TEMPLATE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${DEST_PARENT%/}/${FOLDER}"

if [[ -e "$TARGET" ]]; then
  echo "Refusing to overwrite existing path: $TARGET" >&2
  exit 1
fi

mkdir -p "$(dirname "$TARGET")"
rsync -a \
  --exclude node_modules \
  --exclude dist-build \
  --exclude .git \
  --exclude 'BuildResult' \
  "$TEMPLATE_ROOT/" "$TARGET/"

# Update package name
if [[ -f "$TARGET/package.json" ]]; then
  node -e "
    const fs=require('fs');
    const p='$TARGET/package.json';
    const j=JSON.parse(fs.readFileSync(p,'utf8'));
    j.name='$FOLDER';
    j.description='Kurtosys Studio embeddable widget: $WIDGET_CAMEL ($CLIENT)';
    fs.writeFileSync(p, JSON.stringify(j, null, '\t') + '\n');
  "
fi

# Update env.config placeholders for filename + containerId + embed global
if [[ -f "$TARGET/config/env.config.cjs" ]]; then
  node -e "
    const fs=require('fs');
    const p='$TARGET/config/env.config.cjs';
    let s=fs.readFileSync(p,'utf8');
    s=s.replaceAll(\"filename: 'widget.js'\", \"filename: '${WIDGET_CAMEL}.js'\");
    s=s.replaceAll(\"containerId: 'widget'\", \"containerId: '${WIDGET_CAMEL}'\");
    s=s.replaceAll(\"embedGlobalName: 'widget'\", \"embedGlobalName: '${WIDGET_CAMEL}'\");
    fs.writeFileSync(p,s);
  "
fi

# Update index.html mount id + title
if [[ -f "$TARGET/index.html" ]]; then
  node -e "
    const fs=require('fs');
    const p='$TARGET/index.html';
    let s=fs.readFileSync(p,'utf8');
    s=s.replaceAll('id=\"widget\"', 'id=\"${WIDGET_CAMEL}\"');
    s=s.replaceAll('Studio Widget Template', '${WIDGET_CAMEL} - ${CLIENT}');
    fs.writeFileSync(p,s);
  "
fi

# Update DEFAULT_CONTAINER_IDS fallback in resolve-mount-inputs
if [[ -f "$TARGET/src/utils/resolve-mount-inputs.ts" ]]; then
  node -e "
    const fs=require('fs');
    const p='$TARGET/src/utils/resolve-mount-inputs.ts';
    let s=fs.readFileSync(p,'utf8');
    s=s.replaceAll(\"'widget'\", \"'${WIDGET_CAMEL}'\");
    fs.writeFileSync(p,s);
  "
fi

echo "Created $TARGET"
echo "Next:"
echo "  cd $TARGET"
echo "  # fill config/env.config.cjs GUIDs + tokens"
echo "  npm install"
echo "  npm run dev"
