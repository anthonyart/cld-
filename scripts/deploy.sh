#!/usr/bin/env bash
# Manual, human-run deploy script: rsync app/ to a server, restart it under systemd.
# Claude Code will not run this on its own — it touches a real server.
#
# One-time server setup (create deploy user, install Node, install the systemd unit) is
# documented in docs/deploying.md — run this only after that's done.
#
# Usage:
#   REMOTE_HOST=example.com REMOTE_USER=deploy ./scripts/deploy.sh
set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:?set REMOTE_HOST, e.g. REMOTE_HOST=example.com}"
REMOTE_USER="${REMOTE_USER:-deploy}"
REMOTE_PATH="${REMOTE_PATH:-/opt/claude-code-starter-app}"
SERVICE_NAME="${SERVICE_NAME:-myapp}"
PORT="${PORT:-3000}"

echo "==> Syncing app/ to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.env' \
  app/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "==> Restarting ${SERVICE_NAME} via systemd"
ssh "${REMOTE_USER}@${REMOTE_HOST}" "sudo systemctl restart ${SERVICE_NAME} && sudo systemctl --no-pager --lines=0 status ${SERVICE_NAME}"

echo "==> Health check"
ssh "${REMOTE_USER}@${REMOTE_HOST}" "curl -fsS http://localhost:${PORT}/api/health && echo"

echo "==> Done."
